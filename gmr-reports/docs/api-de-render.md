# La API de render

Escrito para quien integra contra la API y para quien la mantiene.

## El problema que resuelve

La superficie anterior codificaba dos decisiones en la ruta:

| Ruta | Qué reporte | Qué formato |
|---|---|---|
| `GET /api/reports/invoice.pdf` | factura | PDF |
| `GET /api/reports/invoice.xlsx` | factura | XLSX |
| `POST /api/reports/dynamic.pdf` | plantilla en línea | PDF |
| `POST /api/reports/templates/{name}/render` | plantilla guardada | PDF |

Son cuatro rutas para dos tipos de origen y dos formatos, y la combinación no está
completa: tres de las cuatro sólo producen PDF. Con un segundo tipo de reporte hacen
falta dos rutas más, dos métodos más en cada SDK y dos secciones más de documentación.
La factura no es *el* reporte; es **un tipo de reporte entre varios**.

## La forma actual

Un endpoint. Qué reportear y en qué formato son datos de la petición.

```
POST /api/reports/render
GET  /api/reports/render?type=<tipo>&output=<formato>
```

### Origen: exactamente uno de tres

| Campo | Qué es |
|---|---|
| `type` | un tipo del catálogo (`invoice`, `statement`, `aging`), con sus datos de muestra |
| `templateName` | una plantilla que el tenant guardó antes |
| `templateSource` | la plantilla misma, compilada para esta llamada |

Si la petición nombra **más de uno**, la respuesta es `400`. No se elige uno en
silencio: devolver un documento que el llamador no pidió, y cobrárselo, es peor que
fallar.

Si no nombra ninguno, también es `400`, y el mensaje lista los tipos disponibles.

### Formato de salida

`outputFormat` (o `output` en el query string): `pdf` o `xlsx`. Por defecto `pdf`.

Aplica a los tres orígenes, que es el punto. Antes sólo la factura podía salir en
Excel; ahora también una plantilla guardada y una en línea.

Un valor no soportado da `400` en vez de devolver un PDF callado.

### Descubrimiento

```
GET /api/reports/types
```

Devuelve los tipos que este despliegue puede renderizar, con su identificador y los
formatos disponibles. Un tipo cuya plantilla no compiló al arrancar **no aparece**: el
catálogo refleja lo que el proceso puede hacer, no lo que estaba previsto.

### Ejemplos

```bash
# Un tipo del catálogo
curl -H "X-API-Key: $KEY" \
  "https://api.gmrglobe.com/api/reports/render?type=statement&output=pdf" \
  --output estado.pdf

# La misma factura, en Excel
curl -H "X-API-Key: $KEY" \
  "https://api.gmrglobe.com/api/reports/render?type=invoice&output=xlsx" \
  --output factura.xlsx

# Una plantilla guardada, con datos propios
curl -X POST -H "X-API-Key: $KEY" -H "Content-Type: application/json" \
  -d '{"templateName":"mi-plantilla","outputFormat":"xlsx","data":[{"a":1}]}' \
  https://api.gmrglobe.com/api/reports/render --output salida.xlsx
```

```python
client.render(report_type="aging", output_format="xlsx")
client.render(template_name="mi-plantilla", data=filas)
client.render(template_source=jrxml, template_format="crystal")
```

```ts
await client.render({ type: "statement", outputFormat: "xlsx" });
await client.render({ templateName: "mi-plantilla", data: filas });
```

## La palabra «format» significaba otra cosa

El body de `/dynamic.pdf` usaba `format` para el **dialecto** de la plantilla —
`jasper`, `birt`, `crystal` — porque la salida siempre era PDF y nunca hizo falta
nombrarla. Ahora hace falta, y los dos sentidos chocan en un campo que los llamadores
ya están enviando.

La resolución:

- `templateFormat` es el dialecto.
- `outputFormat` es lo que vuelve.
- Un `format` heredado se lee **según su valor**: `"pdf"` y `"xlsx"` son formatos de
  salida, cualquier otra cosa es un dialecto.

Esa última regla no puede equivocarse porque ningún valor es válido en los dos
sentidos. Está cubierta por dos pruebas
(`RenderEndpointTest.aLegacyFormatNamingADialectIsStillADialect` y su par).

## Las rutas retiradas

Siguen funcionando. Están marcadas `@Deprecated`, aparecen como *deprecated* en el
OpenAPI, y **delegan** en `/render` en vez de duplicar la lógica, así que hay un solo
camino de render que mantener correcto.

Las dos rutas `GET` devuelven además dos cabeceras:

```
Deprecation: true
Link: </api/reports/render?type=invoice&output=pdf>; rel="successor-version"
```

Un llamador que no lea cabeceras no se entera de nada. Uno que las registre, o un SDK
que las exponga, sabe a dónde se movió la ruta antes de que desaparezca.

**No tienen fecha de retiro.** Una URL publicada es una promesa; se quitan cuando se
sepa que nadie las llama, no en una fecha elegida de antemano.

## Añadir un tipo de reporte

Dos cosas, ninguna de ellas una ruta:

1. La plantilla en `backend-saas/src/main/resources/reports/<id>.jrxml`.
2. Una entrada en `ReportCatalog.buildCatalog()` con su id, título, descripción y los
   datos de muestra con los que se demuestra.

El endpoint la resuelve, `/types` la lista y los dos SDK ya pasan el string tal cual.

Si la plantilla no compila, el arranque **no falla**: se registra un `WARN` y ese tipo
queda fuera del catálogo. Una muestra rota no puede tumbar el render de los tenants que
no la usan.

## Lo que no cambió, a propósito

`Invoice.java`, la tabla `saas_invoices` y el webhook de Stripe **no se tocaron**.
Ahí «factura» significa la que GMResearch-US LLC le emite a sus tenants, que es una cosa
distinta del tipo de reporte que un tenant renderiza. Son dos sentidos de la misma
palabra y sólo uno de ellos se renombró.

## Pendiente

El motor (`gmr-reports`, repositorio aparte) todavía expone
`InvoiceReportResource` con la forma vieja en la app demo, que es lo que sirve
`sandbox.gmrglobe.com`. Alinearlo implica cortar una 1.7.5, y 1.7.4 es la versión
congelada para producción — es una decisión de release, no de código.
