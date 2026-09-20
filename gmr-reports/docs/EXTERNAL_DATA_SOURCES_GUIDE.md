# Guía Técnica de Integración: Fuentes de Datos Externas
## Arquitectura On-Premise y Multi-Cloud para GMR Reports

**Fecha:** Septiembre 2026  
**Audiencia:** Arquitectos de Soluciones, Ingenieros DevOps y Administradores de Plataforma  

---

### 1. Resumen Ejecutivo

GMR Platform permite desacoplar los datos de negocio de las plantillas de reporte (JRXML/AOT). En lugar de enviar masivos payloads JSON en cada solicitud HTTP, las plantillas pueden conectarse de manera segura y en tiempo real a bases de datos corporativas **On-Premise** (Oracle, PostgreSQL, IBM DB2, Microsoft SQL Server) o **APIs REST / gRPC** internas del cliente.

Toda consulta se rige bajo la política de **Retención Cero (Zero-Data Retention)**: los registros obtenidos residen en memoria RAM transitoria durante el procesamiento del documento y nunca se persisten en almacenamiento secundario.

---

### 2. Topologías de Red Soportadas

`
+-------------------------------------------------------------------------+
|                              CLIENTE ON-PREM                            |
|                                                                         |
|  [ Core Bancario / ERP ] <---> [ Database (Postgres / Oracle / SQL) ]   |
|                                         ^                               |
|                                         | (Private Subnet)              |
|                                [ VPN IPsec Gateway ]                    |
+-----------------------------------------|-------------------------------+
                                          | (Túnel Cifrado AES-256)
+-----------------------------------------|-------------------------------+
|                            OCI KUBERNETES (OKE)                         |
|                                         v                               |
|                                [ IPSec VPN / DRG ]                      |
|                                         |                               |
|                                         v (Internal Overlay Network)    |
|   [ Ingress Controller ] ---> [ GMR SaaS Pods (GraalVM Native) ]        |
|                                 - TemplateDataProvider (JDBC/REST)      |
|                                 - Zero-Retention RAM Buffer             |
|                                 - Enforced Read-Only Engine             |
+-------------------------------------------------------------------------+
`

1. **VPN IPsec Site-to-Site (Recomendado para Banca/Fintech):**  
   Túnel bidireccional entre el gateway del cliente y el Dynamic Routing Gateway (DRG) del clúster OKE.
2. **Conexión Directa Dedicada (OCI FastConnect / AWS Direct Connect):**  
   Enlace de fibra óptica de baja latencia (< 5ms) y ancho de banda garantizado.
3. **mTLS sobre HTTPS Público:**  
   Autenticación mutua con certificados X.509 de cliente/servidor para APIs REST expuestas con IP Allowlisting.

---

### 3. Conectores Disponibles

| Tipo | Protocolo | Motores Homologados | Esquema de Auth |
| :--- | :--- | :--- | :--- |
| `JDBC_ONPREM` | JDBC sobre TCP cifrado | PostgreSQL, Oracle DB, MS SQL Server, MySQL | Basic Auth (Usuario/Clave) |
| `JDBC_CLOUD` | JDBC TLS v1.3 | AWS RDS, Azure SQL, OCI Autonomous DB | IAM Tokens / Password |
| `REST_API` | HTTP/1.1 & HTTP/2 | Microservicios JSON, Spring Boot, FastAPI, Node.js | Bearer Token / API Key |
| `GRPC` | HTTP/2 Protobuf | Servicios de alta frecuencia y streaming binario | mTLS / Token Metadata |

---

### 4. Paso a Paso: Configuración desde la Consola de Administración

1. Acceda a la consola administrativa en **`/admin`** o **`/admin.html`**.
2. Autentíquese mediante **Contraseña Maestra + 2FA** o **SSO Corporativo (Google/GitHub)** con una cuenta autorizada en la lista blanca (ej. `gustavo.muzzillo@gmrglobe.com`).
3. Seleccione la pestaña **🔌 Fuentes Externas**.
4. Haga clic en **➕ Nueva Conexión Externa**.
5. Complete los campos requeridos:
   - **ID de Conexión:** Slug alfanumérico único (ej: `src-core-banking`).
   - **Inquilino Asignado:** Seleccione la empresa (ej: `Banco Financiero Internacional (BFI)`) o `Global`.
   - **Nombre Descriptivo:** Etiqueta para identificar el origen en los logs y auditorías.
   - **Tipo de Conector:** Seleccione `JDBC On-Premise` o `REST API`.
   - **Endpoint / JDBC URL:** Dirección de conexión (ej: `jdbc:postgresql://vpn.bfi-banco.com:5432/core_db`).
   - **Autenticación & Secreto:** Referencia al secreto en bóveda (ej: `env:BANK_CORE_DB_PASS`).
   - **Timeout (ms):** Límite máximo de espera por consulta (recomendado: `5000` ms).
6. Presione el botón **⚡ Probar Conexión en Vivo**:
   - El sistema ejecutará un handshake y un ping `SELECT 1` / `HEAD` en tiempo real, reportando la latencia en milisegundos.
7. Presione **Guardar Conexión**. La configuración quedará sincronizada automáticamente en todas las réplicas del clúster OKE.

---

### 5. Configuración vía REST API

Los administradores pueden automatizar el aprovisionamiento de fuentes externas mediante la API:

#### Registrar / Actualizar Fuente:
`http
POST /api/saas/admin/external-sources
Authorization: Bearer <ADMIN_JWT_TOKEN>
Content-Type: application/json

{
  "sourceId": "src-core-banking",
  "tenantId": "tenant-enterprise",
  "name": "BFI Core Bancario AS400",
  "type": "JDBC_ONPREM",
  "endpointUrl": "jdbc:postgresql://vpn.bfi-banco.com:5432/core_db",
  "authType": "BASIC",
  "secretRef": "env:BANK_CORE_DB_PASS",
  "timeoutMs": 5000,
  "maxRetries": 2,
  "enabled": true,
  "readOnly": true
}
`

#### Probar Conectividad (Dry-Run Ping):
`http
POST /api/saas/admin/external-sources/test
Authorization: Bearer <ADMIN_JWT_TOKEN>
Content-Type: application/json

{
  "endpointUrl": "jdbc:postgresql://vpn.bfi-banco.com:5432/core_db",
  "type": "JDBC_ONPREM",
  "timeoutMs": 3000
}
`

**Respuesta exitosa:**
`json
{
  "successful": true,
  "latencyMs": 14,
  "message": "Handshake JDBC completado con éxito (SELECT 1 respondido).",
  "targetEndpoint": "jdbc:postgresql://vpn.bfi-banco.com:5432/core_db"
}
`

---

### 6. Inyección en Plantillas JRXML

Para vincular una fuente externa a una plantilla dinámica, especifique el ID de la fuente en los metadatos de la solicitud:

`http
POST /api/reports/dynamic.pdf
X-API-Key: gmr_live_ent_••••••••
Content-Type: application/json

{
  "templateId": "estado-cuenta-bancario",
  "dataSourceId": "src-core-banking",
  "parameters": {
    "NUMERO_CUENTA": "0987654321",
    "FECHA_CORTE": "2026-09-30"
  }
}
`

El motor resolverá el proveedor registrado para `src-core-banking`, ejecutará la consulta parametrizada de manera segura (read-only) y volcará el result-set directamente al reporte sin tocar disco.

---

### 7. Lista de Verificación de Seguridad (Checklist)

- [x] Usuario de base de datos aprovisionado exclusivamente con permisos `GRANT SELECT`.
- [x] Reglas de Firewall/Security List restringidas a la IP NAT de salida del clúster OKE.
- [x] Flag `readOnly=true` validado a nivel de driver JDBC.
- [x] Bloqueo léxico de inyecciones DDL/DML activo en el motor.
[ DESTINATARIO / CLIENTE FINAL ]
       - Solo legible ingresando clave personal / contraseña de usuario
`

#### Parámetros para Cifrado Nativo de Documentos PDF:
Al invocar el endpoint de renderizado (`/api/reports/dynamic.pdf` o el SDK), se pueden suministrar parámetros criptográficos reservados:

| Parámetro | Tipo | Descripción | Ejemplo |
| :--- | :--- | :--- | :--- |
| `_pdf_user_password` | String | Clave obligatoria para abrir el documento | `\"1712345678\"` (Cédula/RUT) |
| `_pdf_owner_password` | String | Clave administrativa para modificar permisos | `\"Adm!n2026MasterKey\"` |
| `_pdf_permissions` | Integer | Máscara de permisos (impresión, copia, lectura) | `2052` (Permitir solo lectura/impresión) |

Ejemplo en JSON de solicitud:
`json
{
  "templateId": "extracto-bancario-confidencial",
  "dataSourceId": "src-core-banking",
  "parameters": {
    "NUMERO_CUENTA": "0987654321",
    "_pdf_user_password": "ClientePIN_2026",
    "_pdf_owner_password": "SuperSecureBankOwnerKey99"
  }
}
`

El PDF resultante saldrá del motor de renderizado **nativamente cifrado con AES-256**. Ningún atacante o intermediario que intercepte el archivo en la red, en el correo o en un bucket S3 podrá ver los saldos o datos personales sin la contraseña del usuario.
