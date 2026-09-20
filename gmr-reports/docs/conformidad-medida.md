# Conformidad medida

Todas las cifras de esta página salen de pruebas que se pueden volver a correr, y cada
una lleva su comando. No hay ninguna estimada.

Actualizado el 17 de septiembre de 2026, versión 1.7.5.

## Por qué hay dos tipos de cifra

Una suite de conformidad propia dice si una característica funciona aislada. La escribe
la misma persona que escribió el analizador, así que un 100 % ahí es necesario y no es
suficiente.

La pregunta que tiene un cliente que migra es otra: **«¿renderizan mis informes?»**. Para
responderla hacen falta plantillas que escribió otra gente, para otra cosa. De ahí las
dos tablas.

## Suites por dialecto

Casos escritos por nosotros, uno por característica, clasificados en **soportado**,
**ignorado** o **rechazado**. La categoría del medio es la que importa: la plantilla
renderiza sin error y el contenido falta en silencio.

| Dialecto | Casos | Comando |
|---|---|---|
| JasperReports (`.jrxml`) | **48 / 48** | `mvn -pl gmr-reports-core test -Dtest=JrxmlConformanceSuiteTest` |
| Eclipse BIRT (`.rptdesign`) | **21 / 21** | `mvn -pl gmr-reports-core test -Dtest=BirtConformanceSuiteTest` |
| Crystal Reports (`.rpt.xml`) | **30 / 30** | `mvn -pl gmr-reports-core test -Dtest=CrystalConformanceSuiteTest` |

Cada ejecución escribe un informe en `target/<dialecto>-conformance.md` que nombra cada
caso y su resultado.

## Plantillas reales, de terceros

### Eclipse BIRT — los diseños de ejemplo del propio proyecto Eclipse

| Medida | Resultado |
|---|---|
| Diseños | 60 |
| Parsean | **60 / 60** |
| Renderizan | **59 / 60** |
| Elementos recuperados por el analizador | **97 %** |
| **Texto de la plantilla que llega al PDF** | **96 %** |

```
bin/fetch-conformance-corpus.sh
mvn -pl gmr-reports-core test -Dtest=RealWorldCorpusConformanceTest -Dcorpus.tests=true
```

El único que no renderiza usa `sum` como función de expresión, que este motor no evalúa
—su evaluador tiene un conjunto fijo de operaciones y no ejecuta código arbitrario, que
es deliberado—.

### Crystal Reports — los informes que SAP distribuye con Business One

Binarios `.rpt`, decodificados por el [Migration Toolkit](#migration-toolkit) y pasados
por el motor.

| Medida | Resultado |
|---|---|
| Informes | 44 |
| Convierten desde el binario | **44 / 44** |
| Parsean | **44 / 44** |
| Renderizan | **44 / 44** |
| Objetos recuperados | **2.438 / 2.438 (100 %)** |
| **Texto de la plantilla que llega al PDF** | **81 %** |

El 19 % restante son seis textos, todos en los dos informes `B1Budget`, y no son un
defecto: son marcadores de fórmula (`{@Title_Budget}`) renderizados literalmente y
recortados por cajas de 44 pt que el diseñador dimensionó para el valor corto que la
fórmula resuelve. **En los otros cuarenta y dos informes llega todo el texto.**

## Migration Toolkit

Convierte un `.rpt` binario en la definición XML que el motor lee, **sin ningún runtime
de SAP instalado en ninguna parte**. Decodifica el contenedor OLE2, el cifrado del
payload y el árbol de registros, y mapea el resultado al vocabulario del analizador
Crystal.

```
POST /api/reports/convert     # los bytes del .rpt; devuelve el XML
```

Lo que la conversión no traslada vuelve en la cabecera `X-Gmr-Not-Converted`, no en
silencio. Hoy quedan fuera el mapa de bits de una imagen —el motor resuelve imágenes por
referencia—, el contenido de un subreporte y la retícula de una tabla cruzada; en los
tres casos se emite la caja para que el layout no se desplace.

Un despliegue sin el toolkit responde `501` con la instrucción de exportar desde Crystal
Designer, que es lo correcto para una instalación propia.

## Sobre cómo se mide el texto en el PDF

La fila «texto que llega al PDF» abre el documento generado y busca las palabras que
estaban en la plantilla, que es lo que hace un lector. Esa comprobación estuvo mal una
vez y conviene decirlo: la extracción inflaba los flujos del PDF y leía los operandos,
que son índices de glifo cuando la fuente va embebida como subconjunto —«Total» en Arial
se escribe `7RWDO`—. Parecía suficiente contra diseños BIRT sólo porque ésos caen en
fuentes base-14, que no se subconjuntan.

Corregido, la cifra de Crystal pasó de 0 % a 81 % y la de BIRT de 93 % a 96 %. **El motor
era correcto las dos veces; la medición estaba mal una.**
