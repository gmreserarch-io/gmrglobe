# Almacenamiento de plantillas de tenant

Cómo se guardan, se leen y se invalidan las plantillas que un cliente crea en la
consola. Documenta el estado a partir del commit `6e30223`.

## El problema que resuelve

`ReportGatewayResource` guardaba las plantillas en un `ConcurrentHashMap` en
memoria, y el Deployment corre **dos réplicas**. Las consecuencias, en orden de
gravedad:

1. Una plantilla guardada contra un pod era invisible desde el otro. El Ingress
   fija la sesión del navegador con una cookie (`GMR_PORTAL_SESSION`), así que la
   consola casi siempre acertaba de pod; cualquier cliente HTTP sin cookie —los
   SDK, curl, un backend del cliente— tenía un 50% de encontrarla.
2. Cualquier reinicio las borraba todas. Un rollout normal perdía el trabajo de
   los clientes.
3. Mientras tanto, `/api/reports/health` anunciaba `clustered: true`.

## La arquitectura

```
consola / SDK
     │
     ▼
ReportGatewayResource ──► TenantTemplateStore ──► PostgresTenantStorage
     │                                                (saas_templates)
     │                                                      ▲
     └──► GmrReportService.renderExternalPdf()              │
              │                                             │
              ▼                                             │
        ClusteredTemplateManager                            │
              ├── L1: compilado en memoria, por pod         │
              ├── revisión compartida en Redis ────┐        │
              └── PostgresTemplateProvider ────────┼────────┘
                                                   │
                                            gmr-redis-service
```

**PostgreSQL es la verdad.** `saas_templates`, con clave primaria compuesta
`(tenant_id, name)` — que es exactamente el índice que necesitan las dos únicas
lecturas que existen: una plantilla, o las plantillas de un tenant. `created_at`
sobrevive a una actualización: cuándo se creó no cambia porque alguien la edite.

**Redis coordina, no almacena.** Esto sorprende a casi todo el mundo que lee el
código por primera vez. `ClusteredTemplateManager` guarda el *compilado* en una
caché L1 dentro de cada pod, y en Redis pone únicamente
`rev:<templateId>` con el último `updated_at` conocido. En cada lectura compara
su revisión local con la compartida y, si la compartida es más nueva, descarta su
compilado y recarga del origen.

Es decir: **Redis no contiene plantillas ni artefactos compilados.** Contiene
marcadores de versión. Perder Redis entero cuesta coherencia entre réplicas,
nunca datos.

## Por qué no un volumen ReadWriteMany

Fue la primera decisión, y se revirtió al mirar el clúster:
`kubectl get storageclass` devuelve `oci` y `oci-bv`, ambos block volumes, que se
montan en un nodo por diseño. No hay ninguna clase RWX. Habría hecho falta un
File System en OCI FSS, un mount target en la VCN y reglas NFS en la security
list de producción — para unos pocos KB de XML por tenant.

El claim sigue versionado en `backend-saas/k8s-templates-pvc.yaml`, **sin
aplicar**, porque sigue siendo la forma correcta para un cliente que despliega el
motor por su cuenta: `SharedStorageClusterSync` sincroniza nodos con un volumen
compartido y sin broker, y eso es una capacidad que el chart vende.

## Por qué no object storage

Montarlo como volumen exige FUSE, y FUSE sobre objetos no tiene renombrado
atómico — que era justamente la propiedad en la que se apoyaba la implementación
anterior para que un pod no leyera un archivo a medio escribir. Hablarle por API
habría sumado una dependencia en una imagen nativa de GraalVM y una credencial
más que gestionar, para datos que ya tienen su sitio natural al lado de
`saas_tenants` y `saas_invoices`, en el mismo backup.

## Por qué no se cachea el compilado

Se evaluó cachear el `.gmrb` en Redis con clave por SHA-256 del fuente, de modo
que una plantilla modificada tuviera otra dirección y el obsoleto no se pudiera
leer nunca. Es un diseño mejor en abstracto, y se descartó por aritmética: con
dos pods ahorra **dos compilaciones de 12 ms por versión de plantilla, en toda su
vida**, a cambio de un primitivo nuevo en el motor —no existe forma pública de
registrar una definición ya compilada que venga de fuera— y por tanto una release
del motor.

Si algún día hay muchos pods, o muchas plantillas recompilándose en cada rollout,
esta es la optimización a hacer y esta es la razón por la que entonces sí valdrá
la pena.

## Ids de plantilla

`PostgresTemplateProvider` usa ids con la forma `tenantId/name`. La barra es la
frontera entre tenants. Un id sin exactamente una barra se rechaza en vez de
interpretarse, así que no se puede fabricar uno que alcance las plantillas de
otro tenant. Ambas mitades ya vienen normalizadas por
`TenantTemplateStore.sanitizeName()`, que reduce a `[a-z0-9_-]`.

El proveedor también tolera los sufijos `.jrxml` y `.gmrb` que el motor añade
cuando busca un archivo en disco: aquí el id es una clave de base de datos y esos
sufijos no forman parte del nombre.

## Degradación

Todo esto es opcional hacia abajo, deliberadamente:

| Situación | Comportamiento |
|---|---|
| Sin datasource | `TenantTemplateStore` mantiene un mapa en memoria. El arranque lo registra como **warning**: en producción significaría perder plantillas de clientes en silencio. Es lo que quieren el perfil de test y un portátil. |
| Redis sin configurar (`REDIS_HOST` vacío) | El motor recibe el proveedor sin caché distribuida. Correcto para una sola réplica. |
| Redis inalcanzable o contraseña incorrecta | Igual que el anterior, con un warning que nombra la causa. |

Negarse a arrancar porque falta una caché convertiría una optimización degradada
en una caída. Las operaciones de `RedisCacheProvider` capturan y devuelven nulo,
así que incluso una autenticación fallida en caliente se traduce en «la caché
siempre falla», no en un error de render.

### La sonda de arranque

`TemplateClusterConfigurator.roundTrips()` escribe una clave y la relee en vez de
fiarse de `isAvailable()`. Ese método solo abre un socket, y **un Redis con
`requirepass` acepta la conexión y luego rechaza todos los comandos**: una
contraseña incorrecta parecía sana mientras cada lectura fallaba en silencio. El
comportamiento seguía siendo seguro, pero la línea de arranque afirmaba una
coherencia que el despliegue no tenía — el tipo de cosa que cuesta una hora en
mitad de un incidente.

## Redis: por qué uno propio

Ya había un Redis corriendo en el namespace `mendiguren`. Se descartó reutilizarlo
tras mirar su configuración: `protected-mode no`, sin `requirepass`, compartido
con lo que sea que viva ahí. Las plantillas llevan lógica de negocio, nombres de
campos y a veces consultas: son datos del cliente. Ponerlos en una caché sin
autenticación que otras aplicaciones pueden leer es una decisión de exposición
disfrazada de una de rendimiento.

**Coste: cero.** Los dos nodos son `VM.Standard.A1.Flex` de 2 OCPU y 12 GB, que es
exactamente la cuota Always Free de Ampere, y tenían ~450m y ~550m de CPU sin
reclamar. El pod pide 50m y 32Mi. Lo que sí cuesta es una cosa más que parchear y
vigilar, que es el precio honesto de no compartir una caché sin autenticación.

Sin persistencia a propósito: `save ""`, `appendonly no`, `allkeys-lru`. Todo lo
que hay dentro se puede recalcular, así que perderlo cuesta una recompilación y
nunca una respuesta incorrecta. Por eso el desalojo por LRU es seguro aquí.

`strategy: Recreate` y no `RollingUpdate`: dos pods de Redis detrás de un mismo
Service repartirían los marcadores de revisión al azar entre ambos, que es peor
que unos segundos sin caché mientras reinicia.

Las probes ejecutan `redis-cli -a "$REDIS_PASSWORD" ping`. Sin `-a` un PING
responde igual con la contraseña mal, y el pod se reportaría sano siendo
inutilizable.

## Desplegar desde cero

```bash
# 1. La contraseña. No está en ningún manifiesto.
kubectl create secret generic gmr-redis-secret -n gmr-reports \
  --from-literal=REDIS_PASSWORD="$(openssl rand -base64 32)"

# 2. Redis.
kubectl apply -f backend-saas/k8s-redis.yaml

# 3. Comprobar que responde autenticado, no solo que el puerto abre.
kubectl exec -n gmr-reports deploy/gmr-redis -- \
  sh -c 'redis-cli -a "$REDIS_PASSWORD" --no-auth-warning ping'
```

El backend toma `REDIS_HOST=gmr-redis-service` de su Deployment y la contraseña
del mismo secret, marcada `optional: true` para que el orden de despliegue no
importe. La tabla `saas_templates` se crea sola al arrancar, en `createTables()`.

## Verificar que funciona

Lo que hay que comprobar no es que Redis esté vivo, sino que una edición se
propaga. Con dos réplicas:

```bash
# Guardar, renderizar, editar, renderizar. El segundo PDF debe decir otra cosa.
curl -sX POST https://api.gmrglobe.com/api/reports/templates \
  -H "X-API-Key: $KEY" -H 'Content-Type: application/json' \
  -d '{"name":"prueba","format":"jrxml","content":"...VERSION UNO...","description":"x"}'

curl -sX POST https://api.gmrglobe.com/api/reports/templates/prueba/render \
  -H "X-API-Key: $KEY" -H 'Content-Type: application/json' \
  -d '{"parameters":{},"data":[]}' -o v1.pdf
```

Repetir el guardado con otro texto y volver a renderizar varias veces, para caer
en ambas réplicas. **No comparar los bytes**: dos renders de la misma plantilla
nunca son idénticos, hay un campo variable en el trailer del PDF. Comparar el
texto, que va en un stream FlateDecode. `TemplateRevisionTest` hace exactamente
eso y es el ejemplo a copiar.

En los logs de arranque, la línea que confirma el modo:

```
Tenant templates: PostgreSQL as the source, Redis at gmr-redis-service:6379
coordinating revisions across replicas. Node id gmr-saas-backend-xxxxx.
```

Si dice `without a distributed cache` o `did not answer a probe`, está degradado.

## Archivos

| Archivo | Qué es |
|---|---|
| `TenantTemplateStore` | API del almacén; Postgres o mapa en memoria |
| `PostgresTenantStorage` | tabla `saas_templates` y su CRUD |
| `PostgresTemplateProvider` | `TemplateProvider` del motor sobre la tabla |
| `TemplateClusterConfigurator` | cableado al arrancar y sonda de Redis |
| `k8s-redis.yaml` | Redis propio, con contraseña y sin persistencia |
| `k8s-templates-pvc.yaml` | claim RWX, sin aplicar, para el motor self-hosted |
| `TenantTemplateStoreTest` | contrato del almacén y aislamiento entre tenants |
| `TemplateRevisionTest` | que una edición cambia lo que dice el render |
