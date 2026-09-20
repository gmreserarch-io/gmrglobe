/**
 * GMR Reports Web Platform - Internationalization (i18n) Engine
 * Supports seamless reactive switching between Spanish (es) and English (en)
 * Preserves user preference in localStorage ('gmr_preferred_language')
 * Adheres to standard technical terms without language mixing.
 */

(function (window, document) {
  'use strict';

  const STORAGE_KEY = 'gmr_preferred_language';
  const SUPPORTED_LANGS = ['es', 'en'];
  const DEFAULT_LANG = 'es';

  const translations = {
    es: {
      // Global & Common
      "common.brand_tagline": ">> Science in Action",
      "common.aot_engine": "Motor AOT",
      "common.portal_clients": "Portal Clientes",
      "common.sandbox": "Studio Sandbox",
      "common.github": "GitHub",
      "common.back_home": "Volver al Inicio",
      "common.back_platform": "Volver a la Plataforma",
      "common.swagger_ui": "Swagger UI",
      "common.openapi": "OpenAPI 3.1",
      "common.logout": "Cerrar Sesión",
      "common.loading": "Cargando...",
      "common.save": "Guardar",
      "common.cancel": "Cancelar",
      "common.confirm": "Confirmar",
      "common.active": "Activo",
      "common.error": "Error",
      "common.success": "Éxito",
      "common.close": "Cerrar",
      "common.copy": "Copiar",
      "common.copied": "Copiado!",
      "common.download_pdf": "Descargar PDF",
      "common.view_details": "Ver Detalles",
      "common.lang_selector": "Idioma",

      // Top Announcement Bar
      "announcement.badge": "v1.7.5",
      "announcement.text": "Ya conviertes tus informes de Crystal Reports sin SAP y sin una máquina Windows: 44 de 44 archivos reales, medidos.",
      "announcement.link": "Ver cómo →",

      // Navigation Links
      // Consola: panel de claves
      // Consola: panel de uso y cuotas
      // Consola: estudio, dialogos y cabecera
      "common.cancel": "Cancelar",
      "common.format_json": "Formatear el JSON",
      "common.invoice": "Factura",
      "dlg.active_tenant": "Inquilino activo:",
      "dlg.ai_preview": "Vista previa de los cambios",
      "dlg.ai_result": "Cómo queda la plantilla:",
      "dlg.ai_why": "Qué ha cambiado:",
      "dlg.apply_changes": "Aplicar los cambios",
      "dlg.close": "Cerrar",
      "dlg.convert": "Convertir este .rpt",
      "dlg.discard": "✕ Descartar",
      "dlg.engine": "Motor del informe:",
      "dlg.load_xtreme": "Cargar el ejemplo SAP Xtreme",
      "dlg.pick_main": "Elegir la plantilla principal",
      "dlg.rpt_how": "¿Cómo se compila este informe?",
      "dlg.rpt_ole2": "Detectada una estructura OLE2 de Windows",
      "dlg.rpt_title": "Archivo binario de SAP Crystal (.rpt)",
      "dlg.tpl_name": "Nombre único de la plantilla (su identificador en la API):",
      "dlg.tpl_notes": "Descripción o notas:",
      "hdr.manual": "Manual de usuario",
      "hdr.portal": "Portal de clientes",
      "hdr.resources": "📚 Recursos",
      "hdr.sso": "Entrar con",
      "hdr.tenant_ent": "Global Finance (ejemplo, plan Enterprise)",
      "hdr.tenant_free": "Comunidad (plan gratuito)",
      "hdr.tenant_pro": "Acme Logistics (ejemplo, plan Pro)",
      "studio.ai": "Asistente de IA",
      "studio.ai_header": "Estilo de encabezado",
      "studio.ai_hint": "Pide los cambios con tus palabras",
      "studio.ai_statement": "Extracto",
      "studio.ai_title": "✨ Diseñar o modificar con IA",
      "studio.apply": "Aplicar",
      "studio.awaiting": "Esperando",
      "studio.clear": "Cancelar / limpiar",
      "studio.empty_body": "Pulsa «Generar el PDF» y aparecerá aquí.",
      "studio.empty_title": "Aún no hay documento",
      "studio.engine": "Motor:",
      "studio.engine_birt": "Eclipse BIRT (.rptdesign)",
      "studio.engine_crystal": "Crystal Reports (.rpt o .rpt.xml)",
      "studio.engine_jasper": "JasperReports (.jrxml)",
      "studio.ex_birt": "Logística con Eclipse BIRT",
      "studio.ex_birt_desc": "Auditoría de flota y gráficos",
      "studio.ex_crystal_desc": "Desglose jerárquico y tablas cruzadas",
      "studio.ex_jasper": "Factura con JasperReports",
      "studio.ex_jasper_desc": "Código QR, tablas y totales",
      "studio.examples": "Ejemplos",
      "studio.export_xlsx": "Exportar a Excel",
      "studio.external": "Recursos externos detectados",
      "studio.external_count": "0 necesarios",
      "studio.insert_logo": "Insertar logotipo",
      "studio.live_edit": "Edición en vivo",
      "studio.load_assets": "Cargar subinformes y recursos",
      "studio.load_bundle": "Cargar paquete (.zip/.tar.gz)",
      "studio.load_folder": "Cargar carpeta",
      "studio.load_template": "Cargar plantilla",
      "studio.make_pdf": "Generar PDF",
      "studio.my_templates": "Mis plantillas",
      "studio.ready": "Listo para compilar",
      "studio.refresh": "↻ Actualizar",
      "studio.render": "Generar el PDF",
      "studio.save_hint": "Guarda una con el botón «Guardar en el inquilino»",
      "studio.source": "Código de la plantilla (XML / JRXML / RPT):",
      "studio.tenant_templates": "Plantillas guardadas en tu inquilino",
      "studio.undo": "Deshacer",
      "studio.fmt_crystal": "SAP Crystal Reports (.rpt)",
      "studio.fmt_birt": "Eclipse BIRT (.rptdesign)",
      "studio.fmt_jasper": "JasperReports (.jrxml)",
      "studio.fmt_loaded_crystal": "SAP Crystal Reports (.rpt) \u2014 cargado desde un archivo tuyo",
      "studio.fmt_loaded_birt": "Eclipse BIRT (.rptdesign) \u2014 cargado desde un archivo tuyo",
      "studio.fmt_loaded_jasper": "JasperReports (.jrxml) \u2014 cargado desde un archivo tuyo",
      "keys.sandbox_plan_label": "Plan:",
      "studio.params_label": "Parámetros:",
      "studio.rows_label": "Filas de datos:",
      "studio.live_preview": "Vista previa",
      "dlg.save_title": "Guardar la plantilla en tu inquilino",
      "dlg.save_button": "Guardar la plantilla",
      "studio.tab_template": "Plantilla del informe",
      "studio.tab_data": "Datos y parámetros (JSON)",
      "usage.title": "Uso y cuotas",
      "usage.subtitle": "Lo que este inquilino ha consumido en el mes de facturación en curso",
      "usage.refresh": "🔄 Actualizar",
      "usage.load_failed": "No se han podido cargar las cifras, así que no se muestra ninguna. Comprueba que la clave del inquilino activo es la correcta.",
      "usage.plan": "Plan actual",
      "usage.used": "Usado este mes",
      "usage.remaining": "Cuota restante",
      "usage.resets": "se reinicia a fin de mes",
      "usage.volume": "Volumen generado",
      "usage.of_quota": "de {quota} al mes",
      "usage.total_requests": "{n} peticiones en total",
      "usage.cycle": "Cuota consumida en este ciclo de facturación",
      "keys.title": "Claves de API",
      "keys.subtitle": "Gestiona las credenciales que está usando este navegador",
      "keys.active_label": "Clave secreta del inquilino activo:",
      "keys.copy": "Copiar clave",
      "keys.auth_hint": "Autentica tus peticiones enviando este token en <code class=\"text-slate-300 font-mono\">X-API-Key</code>.",
      "keys.disconnect": "Desconectar este navegador",
      "keys.revoke_note": "Esto solo olvida la clave en este ordenador; el inquilino y sus documentos siguen igual. Para revocar un inquilino de verdad, lo hace un administrador desde la consola de administración.",
      "keys.disconnect_confirm": "¿Olvidar la clave de «{tenant}» en este ordenador? El inquilino no se toca, y puedes volver a pegar la clave más adelante.",
      "keys.disconnect_done": "Este navegador ha olvidado la clave. El inquilino sigue intacto.",
      "keys.demo_cannot_disconnect": "Este es uno de los inquilinos de ejemplo que vienen en la página, no es tuyo. Crea un sandbox para tener una clave propia.",
      "keys.stripe_title": "💳 Suscripción con Stripe",
      "keys.stripe_badge": "Autoservicio",
      "keys.stripe_body": "¿Necesitas más de 25.000 documentos, cuotas multi-inquilino o SLA del 99,9 %? Activa Launch (49 $/mes), Growth (149 $/mes) o Scale (499 $/mes).",
      "keys.stripe_cta": "Ver los planes →",
      "keys.sandbox_title": "Crear un sandbox",
      "keys.sandbox_body": "Alta inmediata, sin tarjeta. El identificador y la clave los genera el servidor, y la clave se muestra una sola vez. <span class=\"text-slate-300\">100 documentos al mes, 20 peticiones por minuto.</span>",
      "keys.sandbox_org_label": "Nombre de la organización:",
      "keys.sandbox_plan": "Sandbox &mdash; para producción, <a href=\"/licensing\" class=\"text-emerald-400 hover:underline\">suscríbete</a>",
      "keys.sandbox_create": "+ Crear sandbox",
      "quickstart.title": "Integración y primeros pasos",
      "quickstart.subtitle": "Copia fragmentos de código ya configurados con tu clave activa",
      "nav.how": "Cómo funciona",
      "nav.uses": "Para qué sirve",
      "nav.variants": "Formas de usarlo",
      "docs.docker_intro": "O ejecuta el motor entero en tu propia máquina, ahora mismo:",
      "portal.back_step1": "Volver a modificar credenciales",
      "portal.expires_in": "Expira en:",
      "nav.features": "Características",
      "nav.benchmarks": "Rendimiento",
      "nav.conformance": "Conformidad",
      "conf.badge": "Conformidad medida",
      "conf.title": "Publicamos nuestras cifras de compatibilidad, y cómo las obtuvimos",
      "conf.subtitle": "«100 % compatible» es una afirmación. Esto son mediciones, cada una reproducible con un comando, que corren en CI en cada commit. Incluida la que no es 100 %.",
      "conf.suites_label": "Suites por característica",
      "conf.suites_note": "Un caso por característica, clasificado en soportado, <b>ignorado</b> o rechazado. El del medio es el que importa: la plantilla renderiza sin error y el contenido falta en silencio. Estos casos los escribimos nosotros, así que un 100 % aquí es necesario y no suficiente.",
      "conf.birt_label": "Diseños BIRT reales, escritos por otros",
      "conf.text_on_page": "del texto de la plantilla llega a la página",
      "conf.designs": "Diseños",
      "conf.parse": "Parsean",
      "conf.render": "Renderizan",
      "conf.birt_note": "Los diseños de ejemplo del propio proyecto Eclipse. El único que no renderiza usa <code class=\"text-cyan-300\">sum</code> como función de expresión, que este motor no evalúa: ejecuta un conjunto fijo de operaciones y ningún código arbitrario, deliberadamente.",
      "conf.crystal_label": "Informes SAP reales, desde el .rpt binario",
      "conf.convert_render": "convierten y renderizan",
      "conf.objects": "Objetos recuperados",
      "conf.text_pdf": "Texto que llega al PDF",
      "conf.crystal_note": "Los informes que SAP distribuye con Business One, interpretados desde el binario propietario sin software de SAP en ninguna parte. <b>81 % y no 96 %</b>: los seis textos que faltan están todos en dos informes de presupuesto, marcadores de fórmula recortados por cajas que su diseñador dimensionó para el valor corto que la fórmula resuelve. En los otros cuarenta y dos llega todo el texto.",
      "conf.link": "Lee las cifras con el comando que reproduce cada una →",
      "nav.calculator": "Calculadora ROI",
      "nav.docs": "Documentación",
      "nav.faqs": "Preguntas Frecuentes",
      "nav.pricing": "Precios y Planes",
      "nav.community": "Comunidad",

      // Hero Section
      // Rewritten after a friends-and-family read: every one of them said the page was
      // too technical to tell what the product was. The headline now says what the
      // customer gets; GraalVM, AOT compilation and the cold-start figure moved down to
      // the sections where somebody is actually asking.
      "hero.badge_compatibility": "Funciona con las plantillas de informes que ya tienes",
      "hero.title_part1": "Tus facturas e informes,",
      "hero.title_gradient": "generados solos.",
      "hero.subtitle": "Conecta las plantillas que ya usas y recibe el documento terminado: PDF, Excel o Word. Sin rehacer tus informes y sin un servidor de informes que mantener.",
      "hero.cta_try": "Probar gratis",
      "hero.cta_how": "Ver cómo funciona",
      "hero.cta_talk": "Hablar con nosotros",
      "hero.compat_label": "Lee tus plantillas de",

      // Como funciona
      "how.title": "Tres pasos, y el documento está hecho",
      "how.subtitle": "Lo que tu empresa ya envía —facturas, extractos, informes— sale de aquí. De uno en uno o cien mil al mes.",
      "how.step1_title": "Traes la plantilla que ya tienes",
      "how.step1_body": "La que hizo tu equipo en JasperReports, Crystal Reports o BIRT. Tal cual está, con su logotipo, sus columnas y su letra pequeña legal. Nadie tiene que rediseñar nada.",
      "how.step2_title": "Le envías los datos",
      "how.step2_body": "Tu propio sistema manda el cliente, los importes, las fechas. Es una sola llamada, y a tus programadores les damos las piezas ya hechas.",
      "how.step3_title": "Recibes el documento terminado",
      "how.step3_body": "PDF, Excel, Word, HTML o CSV. Listo para enviar, archivar o firmar. En milésimas de segundo, así que nadie se queda esperando.",
      "how.crystal_title": "\u00bfVienes de Crystal Reports?",
      "how.crystal_body": "Tus archivos <code class=\"text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded font-mono text-sm\">.rpt</code> siguen funcionando, sin licencia de SAP y sin una máquina Windows encendida solo para imprimir. Cogimos 44 informes reales y salieron los 44.",
      "how.crystal_cta": "Ver lo que medimos",

      // Para que se usa
      "uses.title": "Qué pasa por aquí",
      "uses.subtitle": "Todo lo que tiene que salir igual siempre, y tiene que salir bien.",
      "uses.billing_title": "Facturación",
      "uses.billing_body": "Miles de facturas al mes, cada una con el formato que exige la hacienda de su país.",
      "uses.statements_title": "Extractos",
      "uses.statements_body": "El extracto mensual que un banco o una fintech manda a cada cliente, el día que toca.",
      "uses.reports_title": "Informes de gestión",
      "uses.reports_body": "Los mismos informes que el negocio ya lee, hechos solos en vez de a mano cada mes.",
      "uses.archive_title": "Documentos que hay que conservar",
      "uses.archive_body": "PDF/A para archivo a largo plazo, y firma digital donde la ley la pide.",
      "uses.cta_variants": "Las tres formas de usarlo",

      // Las tres variantes: motor, API y plataforma
      "variants.title": "Tres formas de usarlo",
      "variants.subtitle": "El mismo motor por debajo. Lo que cambia es cuánto pones tú.",
      "variants.api_kicker": "La API",
      "variants.api_title": "Tú llamas, nosotros lo producimos",
      "variants.api_body": "No instalas nada. Tu sistema envía los datos y recibe el documento terminado. Nosotros lo mantenemos en marcha y pagas por lo que uses.",
      "variants.api_for": "<strong class=\"text-white\">Te encaja si</strong> quieres documentos saliendo esta semana y prefieres no montar una cosa más.",
      "variants.api_price": "Gratis para probar, luego desde 49 $ al mes",
      "variants.platform_kicker": "La plataforma",
      "variants.platform_title": "La API, y las pantallas de alrededor",
      "variants.platform_body": "Todo lo de la API, más una consola para gestionar las plantillas, un portal para tus propios clientes y separación entre ellos, de modo que cada uno solo vea sus documentos.",
      "variants.platform_for": "<strong class=\"text-white\">Te encaja si</strong> no solo produces tus documentos, sino que se los ofreces a tus clientes como parte de tu producto.",
      "variants.platform_price": "Desde 149 $ al mes",
      "variants.engine_kicker": "El motor",
      "variants.engine_title": "El mismo software, en tus máquinas",
      "variants.engine_body": "Instalado dentro de tu propia aplicación o como contenedor en tu centro de datos. Tus datos no salen del edificio, y funciona sin conexión ninguna al exterior.",
      "variants.engine_for": "<strong class=\"text-white\">Te encaja si</strong> las normas bajo las que trabajas, o las tuyas propias, dicen que los documentos no pueden salir de casa: banca, administración pública, sanidad.",
      "variants.engine_price": "Licencia anual",
      "variants.cta_pricing": "Ver los precios",
      "variants.switch_note": "Tus plantillas son las mismas en las tres, así que empezar por la API y llevártelo a casa más adelante no te cuesta rehacer nada.",

      // Metrics Cards
      "metrics.cold_start.title": "Arranque en Frío (Cold Start)",
      "metrics.cold_start.sub": "0,069-0,263 s en cinco pods; ~0,07 s con la imagen ya en el nodo",
      "metrics.ram.title": "Huella de RAM en Contenedor",
      "metrics.ram.sub": "81 MiB leidos hoy del pod del motor",
      "metrics.latency.title": "Latencia P99 de Renderizado",
      "metrics.latency.sub": "p50 1,4 ms. Una licencia con cupo suma 10-23 ms de contador",
      "metrics.security.title": "Vulnerabilidades y CVEs",
      "metrics.security.sub": "Aritmética determinista, sin compilación dinamica",

      // ROI Calculator Section
      "calc.badge": "Estimador de Retorno de Inversión",
      "calc.title": "Calcule su Ahorro de Infraestructura en Kubernetes",
      "calc.subtitle": "Compruebe cuánto ahorra en nodos de cómputo AWS EKS, GCP GKE u OKE al eliminar la sobrecarga de la JVM tradicional.",
      "calc.volume_label": "Volumen Mensual de Documentos:",
      "calc.pods_label": "Réplicas Actuales de JasperReports (Pods):",
      "calc.ram_label": "RAM Asignada por Pod:",
      "calc.annual_savings_title": "Ahorro Anual Estimado en Cloud",
      "calc.reduction_label": "Reducción de Costos de Infraestructura",
      "calc.unit_docs": "docs",
      "calc.unit_pods": "pods",
      "calc.unit_gb": "GB",
      "calc.unit_mo": "/ mes",
      "calc.unit_yr": "/ año",
      "calc.legacy_spend_label": "Gasto Cloud Tradicional Actual:",
      "calc.gmr_spend_label": "Gasto Cloud con GMR Reports:",
      "calc.btn_sandbox": "Probar en Sandbox →",
      "calc.btn_quote": "Solicitar Cotización de Migración",
      "calc.engine_label": "Motor Actual en Uso:",
      "calc.engine_jasper": "JasperReports Server / Tomcat (JVM Clásica)",
      "calc.engine_birt": "Eclipse BIRT Runtime (OSGi / Java)",
      "calc.engine_crystal": "Crystal Reports Server / .NET Wrapper",
      "calc.engine_other": "Otro Generador Basado en PDF/HTML",
      "calc.region_label": "Región de Nube / Proveedor:",
      "calc.results_header": "Proyección Anual de Costos",
      "calc.traditional_cost": "Costo de Infraestructura Actual:",
      "calc.gmr_cost": "Costo con GMR Reports AOT:",
      "calc.net_savings": "Ahorro Neto Proyectado:",
      "calc.co2_reduction": "Reducción de Huella de Carbono:",
      "calc.cta_report": "Obtener Informe Técnico de ROI",

      // Features Section
      "features.badge": "Arquitectura y Rendimiento",
      "features.title": "Diseñado para Rendimiento Extremo y Cero Fricción",
      "features.subtitle": "Reemplazo directo (drop-in) de motores heredados de reportes sin reescribir sus plantillas de negocio.",
      "features.card1_title": "Evaluador AST determinista",
      "features.card1_desc": "Las expresiones se evalúan con un analizador de operaciones fijas. Sin Groovy, sin bytecode en tiempo de ejecución, sin reflexión hacia clases arbitrarias.",
      "features.card2_title": "Compilación AOT sub-milisegundo",
      "features.card2_desc": "Las plantillas se precompilan a un binario libre de reflexión en tiempo de construcción: el primer render no paga el parseo del XML.",
      "features.card3_title": "Soporte multi-motor universal",
      "features.card3_desc": "Ejecuta JasperReports (.jrxml) y Eclipse BIRT (.rptdesign) tal cual. El .rpt binario de Crystal Reports lo convierte el Migration Toolkit en el servidor, sin instalar nada: 44 de 44 en los informes que SAP distribuye con Business One.",
      "features.card4_title": "Resiliencia last-known-good",
      "features.card4_desc": "Si se publica una plantilla rota, el motor sigue sirviendo la última versión que compiló en lugar de fallar la petición.",
      "features.card5_title": "Caché sincronizada entre réplicas",
      "features.card5_desc": "Las plantillas compiladas se comparten entre pods mediante Redis, o un volumen compartido en self-hosted, para que una edición hecha en una réplica llegue al resto.",
      "features.card6_title": "Zero-Data Retention (ZDR)",
      "features.card6_desc": "Los documentos se renderizan en memoria y se devuelven en streaming. Los datos que envías para renderizar no se escriben a disco.",
      "features.card7_title": "Arquitectura multi-tenant aislada",
      "features.card7_desc": "Credenciales por inquilino, limitación por token bucket y cuota mensual contabilizada en PostgreSQL, de modo que todas las réplicas aplican el mismo cupo.",
      "features.card8_title": "SDKs para Python, TypeScript y .NET",
      "features.card8_desc": "Una sola llamada de render en cada uno. El tipo de reporte y el formato de salida son argumentos, no métodos distintos, así que un tipo nuevo no exige publicar un SDK nuevo.",
      "features.card9_title": "Códigos de barras y QR vectoriales",
      "features.card9_desc": "ZXing dibujado directamente en vectores PDF. Sin AWT, sin X11, nada en el contenedor que espere un escritorio.",
      "features.card10_title": "Excel en streaming (FastExcel)",
      "features.card10_desc": "Genera <code class=\"text-emerald-400\">.xlsx</code> con compresión ZIP en streaming: un libro grande no se convierte en un OutOfMemoryError.",
      "features.card11_title": "Helm Chart y Operador Kubernetes",
      "features.card11_desc": "Un chart de Helm para el motor, más CRDs para clústeres de informes y para plantillas.",

      // Documentation Hub
      "docs.badge": "Centro de Documentación",
      "docs.title": "Comience a Trabajar en Menos de 60 Segundos",
      "docs.spring_title": "Integración con Spring Boot 3 Starter",
      "docs.spring_desc": "Añada nuestro starter oficial a su build Maven o Gradle para configuración automática de beans:",
      "docs.spring_inject": "Inyecte el bean del servicio en su controlador:",
      "docs.docker_title": "Imágenes Docker Multi-Arquitectura (ARM64 & AMD64)",
      "docs.docker_desc": "Ejecute localmente en Apple Silicon (M1-M4) o despliegue en AWS Graviton sin sobrecarga de emulación:",
      "docs.quarkus_title": "Extensión Reactiva de Quarkus & Binario Nativo",
      "docs.quarkus_desc": "Compile a un ejecutable nativo ultraligero que arranca en menos de 300 ms en frío, y en unos 70 ms con la imagen ya en el nodo:",
      "docs.helm_title": "Kubernetes Empresarial & Helm Chart",
      "docs.helm_desc": "Despliegue con escalado automático horizontal (HPA) y sincronización con PVC compartido:",
      "docs.sdks_title": "SDKs Oficiales para TypeScript y Python",
      "docs.sdks_desc": "Lógica de reintentos incorporada para gestión de límites HTTP 429 con retroceso exponencial:",
      "docs.migration_title": "Lista de Verificación de Migración JasperReports (.jrxml)",
      "docs.migration_item1": "Cero Reescritura de Plantillas: Mantenga sus diseños creados en Jaspersoft Studio.",
      "docs.migration_item2": "Campos & Parámetros: $F{field}, $P{param}, $V{var} evaluados de forma determinista.",
      "docs.migration_item3": "Subreportes & Códigos de Barras: Renderizado vectorial nativo con OpenPDF y ZXing.",
      "docs.migration_item4": "Sin Groovy Dinámico: Reemplaza compilación insegura con expresiones matemáticas AST seguras.",

      // Benchmarks Section
      "benchmarks.badge": "Medido en Producción",
      "benchmarks.title": "Lo que Cuesta Realmente Operar un Motor de Reportes Nativo",
      "benchmarks.subtitle": "Cifras leídas de nuestros propios pods en Kubernetes (OCI OKE, ARM64 Ampere A1). La metodología y las lecturas crudas están publicadas.",
      "benchmarks.measured_on": "Medido en:",
      "benchmarks.per_items": "p99, por documento",
      "benchmarks.seconds": "segundos",
      "benchmarks.col_engine": "Motor de Reportes",
      "benchmarks.col_cold_start": "Arranque en Frío",
      "benchmarks.col_ram": "Uso de RAM",
      "benchmarks.col_p99": "Latencia P99 (1k docs)",
      "benchmarks.col_throughput": "Throughput (docs/seg)",

      // Pricing Section
      "pricing.badge": "Plataforma Cloud & Licenciamiento On-Premise",
      "pricing.title": "Planes Transparentes para Cada Nivel de Escala",
      "pricing.subtitle": "Desde APIs serverless de alta velocidad hasta componentes Java/Quarkus embebidos para banca y redes aisladas.",
      "pricing.saas_header": "GMR Cloud SaaS — APIs Gestionadas Multi-Inquilino",
      "pricing.onprem_header": "Licencias On-Premise & Cloud Soberana (Air-Gapped)",
      "pricing.per_month": "/ mes",
      "pricing.popular_badge": "Más Popular",
      "pricing.subscribe": "Suscribir",
      "pricing.try_sandbox": "Probar en Sandbox",
      "pricing.contact_sales": "Contactar a Ventas",
      "pricing.plan_free_title": "Developer Free",
      "pricing.plan_free_desc": "Para evaluación técnica y microservicios locales.",
      "pricing.plan_free_feat1": "1,500 documentos / mes",
      "pricing.plan_free_feat2": "60 req/min (ráfaga 10)",
      "pricing.plan_free_feat3": "Studio Sandbox Web UI",
      "pricing.plan_free_feat4": "Imágenes Docker multi-arquitectura",
      "pricing.plan_free_feat5": "Soporte Comunitario en GitHub",
      "pricing.plan_launch_title": "Launch",
      "pricing.plan_launch_desc": "Para MVPs, startups y aplicaciones de facturación ágil.",
      "pricing.plan_launch_feat1": "25,000 documentos / mes",
      "pricing.plan_launch_feat2": "150 req/min (ráfaga 25)",
      "pricing.plan_launch_feat3": "$0.0025 / doc extra",
      "pricing.plan_launch_feat4": "Claves API ilimitadas",
      "pricing.plan_launch_feat5": "Alertas vía Webhook & Soporte por email",
      "pricing.plan_growth_title": "Growth",
      "pricing.plan_growth_desc": "Para fintechs en crecimiento y plataformas SaaS multi-inquilino.",
      "pricing.plan_growth_feat1": "100,000 documentos / mes",
      "pricing.plan_growth_feat2": "400 req/min (ráfaga 60)",
      "pricing.plan_growth_feat3": "$0.0018 / doc extra",
      "pricing.plan_growth_feat4": "Multi-Tenancy & Fuentes tipográficas",
      "pricing.plan_growth_feat5": "Cero Retención de Datos (ZDR) & SLA 99.9%",
      "pricing.plan_scale_title": "Scale",
      "pricing.plan_scale_desc": "Para aplicaciones críticas con alto volumen documental.",
      "pricing.plan_scale_feat1": "500,000 documentos / mes",
      "pricing.plan_scale_feat2": "1,000 req/min (ráfaga 150)",
      "pricing.plan_scale_feat3": "$0.0012 / doc extra",
      "pricing.plan_scale_feat4": "SLA 99.9% Uptime garantizado",
      "pricing.plan_scale_feat5": "Soporte 24/7 y Onboarding Dedicado",
      "pricing.plan_free_cta": "Probar en Sandbox",
      "pricing.plan_launch_cta": "Suscribir Launch ($49/mo)",
      "pricing.plan_growth_cta": "Suscribir Growth ($149/mo)",
      "pricing.plan_scale_cta": "Suscribir Scale ($499/mo)",
      "pricing.billed_annually": "facturado anualmente",
      "pricing.onprem_badge": "Licenciamiento de Componentes On-Premise",
      "pricing.onprem_title": "Librerías Embebidas, Contenedores y Núcleo Air-Gapped",
      "pricing.onprem_desc": "Diseñado para Core Banking, entidades gubernamentales y centros de datos que requieren procesamiento local sin salida a internet (ZDR estricto, FIPS 140-2 y firma digital PAdES).",
      "pricing.onprem_guide_btn": "Guía Técnica y Legal de Licencias ↗",
      "pricing.onprem_starter_title": "Starter On-Prem",
      "pricing.onprem_starter_sub": "Microservicios / Servidor Único",
      "pricing.onprem_starter_cta": "Solicitar Licencia Starter",
      "pricing.onprem_cluster_title": "Cluster Enterprise HA",
      "pricing.onprem_cluster_sub": "Kubernetes & OpenShift Clúster",
      "pricing.onprem_cluster_badge": "Recomendado Banca",
      "pricing.onprem_cluster_cta": "Solicitar Piloto Enterprise",
      "pricing.onprem_corp_title": "Corporate Unlimited",
      "pricing.onprem_corp_sub": "Misión Crítica & Core Banking",
      "pricing.onprem_corp_cta": "Contactar Ingeniería Corporativa",

      // FAQs
      "faqs.badge": "Resolución de Dudas Técnicas",
      "faqs.title": "Preguntas Frecuentes",
      "faqs.subtitle": "Consultas Técnicas y de Licenciamiento",
      "faqs.q1": "¿Necesitamos reescribir nuestras plantillas JasperReports existentes?",
      "faqs.a1": "No. GMR Reports fue diseñado explícitamente para procesar archivos standard <code class=\"text-emerald-400\">.jrxml</code> generados por Jaspersoft Studio. Bandas, expresiones, parámetros, totales y códigos de barras se renderizan directamente sin rediseño.",
      "faqs.q2": "¿Cómo protege el respaldo Last-Known-Good a producción?",
      "faqs.a2": "Si se sube una plantilla XML inválida o corrupta en un volumen compartido o durante recarga en caliente, GMR Reports detecta el error, emite una alerta y continúa sirviendo sin interrupciones la última versión válida en memoria. El flujo de facturación nunca se detiene.",
      "faqs.q3": "¿Se puede desplegar en Oracle Cloud (OCI), AWS Graviton y Apple Silicon?",
      "faqs.a3": "¡Sí! Nuestras imágenes Docker oficiales en GHCR son multi-arquitectura (<code class=\"text-emerald-400\">linux/amd64</code> y <code class=\"text-emerald-400\">linux/arm64</code>). De hecho, GMR Reports puede ejecutarse en el tier gratuito de OCI consumiendo menos del 1% de la memoria asignada.",
      "faqs.q4": "¿Cuál es la diferencia entre las licencias Community y Enterprise?",
      "faqs.a4": "La Community Edition es gratuita para evaluación y desarrollo con artefactos públicos en Maven Central. La Enterprise Edition incluye licencias Helm para Kubernetes auto-alojado sin conexión a internet (air-gapped), renderizado ilimitado, sincronización clúster Redis/Hazelcast, cumplimiento bancario/FIPS y SLA 24/7 con ingenieros dedicados.",

      // Footer
      "footer.desc": "High-Performance AOT Document & Invoicing Engine. Compilado nativamente con GraalVM Native para latencia baja, sobre plantillas JasperReports, BIRT y Crystal existentes.",
      "footer.product": "Producto",
      "footer.platform": "Plataforma & SaaS",
      "footer.resources": "Recursos",
      "footer.legal": "Legal & Seguridad",
      "footer.legal_compliance": "Legal & Cumplimiento",
      "footer.terms": "Términos de Servicio (Terms)",
      "footer.privacy": "Política de Privacidad (Privacy)",
      "footer.sla": "Acuerdo de Nivel de Servicio (SLA 99.9%)",
      "footer.licensing": "Licenciamiento On-Premise",
      "footer.corporate_contact": "Contacto Corporativo",
      "footer.contact_ecuador": "Ecuador (Economía Dolarizada / Facturación en USD directa).",
      "footer.email_label": "Email:",
      "footer.support_label": "Soporte:",
      "footer.gateway_label": "Gateway:",
      "footer.rights": "Todos los derechos reservados.",

      // Modals (Checkout & Lead Capture)
      "modal.checkout_title": "Aprovisionamiento de Suscripción",
      "modal.checkout_subtitle": "Clave API Instantánea & Acceso a la Plataforma",
      "modal.company_label": "Nombre de la Empresa u Organización *",
      "modal.billing_email_label": "Correo Electrónico de Facturación *",
      "modal.tenant_id_label": "ID de Inquilino (Handle API) *",
      "modal.payment_method_label": "Método de Pago & Aprovisionamiento",
      "modal.pay_stripe_title": "Stripe Checkout 💳",
      "modal.pay_stripe_desc": "Pago Inmediato con Tarjeta",
      "modal.pay_invoice_title": "Factura Proforma (Net 30) 🏢",
      "modal.pay_invoice_desc": "Transferencia Bancaria / SWIFT",
      "modal.btn_activate": "Activar Suscripción & Emitir Clave API",
      "modal.terms_notice": "Cifrado con TLS de 256 bits. Al suscribirse acepta los Términos de Servicio y el SLA de Producción 99.9%.",
      "modal.success_title": "¡Cuenta Aprovisionada y Activa!",
      "modal.success_subtitle": "Su clave API de producción está lista para renderizado inmediato de documentos.",
      "modal.your_key_label": "Su Clave API de Producción:",
      "modal.btn_copy": "📋 Copiar",
      "modal.btn_copied": "✓ ¡Copiado!",
      "modal.key_warning": "Guarde esta clave de forma segura. También puede enviarla en el encabezado X-API-Key o Authorization: Bearer.",
      "modal.curl_label": "Verificación Instantánea vía cURL:",
      "modal.btn_open_studio": "🚀 Abrir en Studio Sandbox",
      "modal.btn_done": "Listo",
      "modal.lead_title": "Agendar Demo de Arquitectura & Piloto",
      "modal.lead_calendar_callout": "¿Prefiere una llamada directa de 15 min con los fundadores?",
      "modal.lead_calendar_btn": "Ver Calendario ↗",
      "modal.lead_name_label": "Nombre Completo *",
      "modal.lead_work_email_label": "Correo de Trabajo *",
      "modal.lead_company_label": "Empresa / Organización *",
      "modal.lead_role_label": "Su Rol",
      "modal.lead_role_cto": "CTO / Vicepresidente de Ingeniería",
      "modal.lead_role_architect": "Arquitecto de Software",
      "modal.lead_role_lead": "Líder Técnico / Desarrollador Senior",
      "modal.lead_role_devops": "DevOps / Plataforma Cloud",
      "modal.lead_role_product": "Dueño de Producto / Facturación",
      "modal.lead_plan_label": "Plan / Tema de Interés",
      "modal.lead_volume_label": "Volumen Mensual de Documentos",
      "modal.lead_engine_label": "Motor de Reportería Actual",
      "modal.lead_notes_label": "Detalles o Requerimientos del Proyecto (Opcional)",
      "modal.lead_notes_placeholder": "Ej: Migrar 40 archivos JRXML a Kubernetes, requerimientos de latencia de arranque en frío...",
      "modal.lead_btn_submit": "Solicitar Piloto Técnico & Contacto",

      // Customer Portal Specifics
      "portal.title": "Portal de Clientes — GMR Reports SaaS",
      "portal.header_title": "Portal de Clientes",
      "portal.header_subtitle": "Gestión de suscripciones, consumo en tiempo real y facturación",
      "portal.login_title": "Autenticación Corporativa de Inquilino",
      "portal.login_subtitle": "Ingrese sus credenciales de inquilino corporativo para gestionar su suscripción.",
      "portal.tenant_key_label": "Clave API o Tenant ID",
      "portal.password_label": "Contraseña Corporativa del Inquilino",
      "portal.show_pwd": "Mostrar",
      "portal.hide_pwd": "Ocultar",
      "portal.btn_continue_2fa": "Continuar a Verificación 2FA",
      "portal.quick_demo": "Acceso Rápido de Prueba (Demo)",
      "portal.step2_title": "Verificación de Seguridad 2FA",
      "portal.step2_subtitle": "Hemos enviado un código de 6 dígitos a su correo autorizado.",
      "portal.otp_label": "Código de Seguridad (OTP)",
      "portal.btn_verify_login": "Verificar e Ingresar al Portal",
      "portal.resend_code": "¿No recibió el código? Reenviar OTP",
      "portal.tab_overview": "Resumen & Consumo",
      "portal.tab_invoices": "Facturas & Pagos",
      "portal.tab_security": "Seguridad & Credenciales",
      "portal.metric_monthly_docs": "Documentos Este Mes",
      "portal.metric_quota_remaining": "Cuota Restante",
      "portal.metric_active_plan": "Plan Contratado",
      "portal.metric_next_billing": "Próxima Facturación",
      "portal.invoices_title": "Historial de Facturación y Comprobantes Fiscales",
      "portal.table_invoice_num": "Factura N°",
      "portal.table_date": "Fecha",
      "portal.table_period": "Período de Servicio",
      "portal.table_amount": "Total",
      "portal.table_status": "Estado",
      "portal.table_action": "Comprobante",
      "portal.btn_change_plan": "Modificar Plan",
      "portal.btn_cancel_sub": "Dar de Baja Suscripción",

      // Developer Console Specifics
      "console.title": "GMR Reports — Developer Console & Studio Sandbox",
      "console.header_title": "GMR Reports Studio",
      "console.header_subtitle": "Motor AOT de Alto Rendimiento",
      "console.active_tenant": "Inquilino Activo:",
      "console.tab_studio": "🎨 Estudio",
      "console.tab_usage": "📊 Uso y cuotas",
      "console.tab_keys": "🔑 Claves de API",
      "console.tab_quickstart": "🚀 SDK y primeros pasos",
      "console.engine_selector": "Motor de Plantilla:",
      "console.reset_sample": "Restablecer Ejemplo",
      "console.btn_render_pdf": "Renderizar PDF en Tiempo Real",
      "console.ai_assist_title": "Asistente de Plantillas con IA",
      "console.ai_prompt_placeholder": "Describa el reporte que necesita (ej: Factura B2B con tabla de impuestos y QR)...",
      "console.ai_generate_btn": "Generar Plantilla con IA",
      "console.json_data_title": "Datos de Prueba (JSON Payload)",
      "console.pdf_preview_title": "Vista Previa del Documento Renderizado",

      // Master Ops Admin Specifics
      "admin.title": "GMR Reports — Panel de Administración de Plataforma",
      "admin.header_title": "Consola de Administración",
      "admin.header_subtitle": "Control maestro de inquilinos, suscripciones, soporte y facturación",
      "admin.restricted_badge": "ZONA MASTER CONTROL — RESTRINGIDA",
      "admin.sso_title": "Autenticación SSO Obligatoria",
      "admin.sso_desc": "El acceso a la consola de administración de GMR Reports requiere autenticación federada con identidad corporativa autorizada en la lista blanca de la plataforma.",
      "admin.sync_cluster": "Sincronizar Clúster",
      "admin.tab_tenants": "Gestión de Inquilinos",
      "admin.tab_whitelist": "Lista Blanca de Administradores",
      "admin.tab_metrics": "Métricas del Clúster",
      "admin.tab_audit": "Registro de Auditoría"
    },

    en: {
      // Global & Common
      "common.brand_tagline": ">> Science in Action",
      "common.aot_engine": "AOT Engine",
      "common.portal_clients": "Customer Portal",
      "common.sandbox": "Studio Sandbox",
      "common.github": "GitHub",
      "common.back_home": "Back to Home",
      "common.back_platform": "Back to Platform",
      "common.swagger_ui": "Swagger UI",
      "common.openapi": "OpenAPI 3.1",
      "common.logout": "Sign Out",
      "common.loading": "Loading...",
      "common.save": "Save",
      "common.cancel": "Cancel",
      "common.confirm": "Confirm",
      "common.active": "Active",
      "common.error": "Error",
      "common.success": "Success",
      "common.close": "Close",
      "common.copy": "Copy",
      "common.copied": "Copied!",
      "common.download_pdf": "Download PDF",
      "common.view_details": "View Details",
      "common.lang_selector": "Language",

      // Top Announcement Bar
      "announcement.badge": "v1.7.5",
      "announcement.text": "Convert your Crystal Reports files with no SAP licence and no Windows machine: 44 of 44 real reports, measured.",
      "announcement.link": "See how →",

      // Navigation Links
      // Console: keys panel
      // Console: usage and quotas panel
      // Console: studio, dialogs and header
      "common.cancel": "Cancel",
      "common.format_json": "Format the JSON",
      "common.invoice": "Invoice",
      "dlg.active_tenant": "Active tenant:",
      "dlg.ai_preview": "Preview of the changes",
      "dlg.ai_result": "How the template ends up:",
      "dlg.ai_why": "What changed:",
      "dlg.apply_changes": "Apply the changes",
      "dlg.close": "Close",
      "dlg.convert": "Convert this .rpt",
      "dlg.discard": "✕ Discard",
      "dlg.engine": "Report engine:",
      "dlg.load_xtreme": "Load the SAP Xtreme example",
      "dlg.pick_main": "Choose the main template",
      "dlg.rpt_how": "How is this report compiled?",
      "dlg.rpt_ole2": "A Windows OLE2 structure was detected",
      "dlg.rpt_title": "SAP Crystal binary file (.rpt)",
      "dlg.tpl_name": "Unique template name (its identifier in the API):",
      "dlg.tpl_notes": "Description or notes:",
      "hdr.manual": "User manual",
      "hdr.portal": "Customer portal",
      "hdr.resources": "📚 Resources",
      "hdr.sso": "Sign in with",
      "hdr.tenant_ent": "Global Finance (example, Enterprise plan)",
      "hdr.tenant_free": "Community (free plan)",
      "hdr.tenant_pro": "Acme Logistics (example, Pro plan)",
      "studio.ai": "AI assistant",
      "studio.ai_header": "Header style",
      "studio.ai_hint": "Ask for changes in plain words",
      "studio.ai_statement": "Statement",
      "studio.ai_title": "✨ Design or change it with AI",
      "studio.apply": "Apply",
      "studio.awaiting": "Waiting",
      "studio.clear": "Cancel / clear",
      "studio.empty_body": "Press “Generate the PDF” and it will appear here.",
      "studio.empty_title": "No document yet",
      "studio.engine": "Engine:",
      "studio.engine_birt": "Eclipse BIRT (.rptdesign)",
      "studio.engine_crystal": "Crystal Reports (.rpt or .rpt.xml)",
      "studio.engine_jasper": "JasperReports (.jrxml)",
      "studio.ex_birt": "Eclipse BIRT logistics",
      "studio.ex_birt_desc": "Fleet audit and charts",
      "studio.ex_crystal_desc": "Hierarchical drilldown and cross-tabs",
      "studio.ex_jasper": "JasperReports invoice",
      "studio.ex_jasper_desc": "QR code, tables and totals",
      "studio.examples": "Examples",
      "studio.export_xlsx": "Export to Excel",
      "studio.external": "External resources found",
      "studio.external_count": "0 needed",
      "studio.insert_logo": "Insert logo",
      "studio.live_edit": "Live editing",
      "studio.load_assets": "Load subreports and assets",
      "studio.load_bundle": "Load bundle (.zip/.tar.gz)",
      "studio.load_folder": "Load folder",
      "studio.load_template": "Load template",
      "studio.make_pdf": "Generate PDF",
      "studio.my_templates": "My templates",
      "studio.ready": "Ready to compile",
      "studio.refresh": "↻ Refresh",
      "studio.render": "Generate the PDF",
      "studio.save_hint": "Save one with the “Save to tenant” button",
      "studio.source": "Template source (XML / JRXML / RPT):",
      "studio.tenant_templates": "Templates saved in your tenant",
      "studio.undo": "Undo",
      "studio.fmt_crystal": "SAP Crystal Reports (.rpt)",
      "studio.fmt_birt": "Eclipse BIRT (.rptdesign)",
      "studio.fmt_jasper": "JasperReports (.jrxml)",
      "studio.fmt_loaded_crystal": "SAP Crystal Reports (.rpt) \u2014 loaded from your own file",
      "studio.fmt_loaded_birt": "Eclipse BIRT (.rptdesign) \u2014 loaded from your own file",
      "studio.fmt_loaded_jasper": "JasperReports (.jrxml) \u2014 loaded from your own file",
      "keys.sandbox_plan_label": "Plan:",
      "studio.params_label": "Parameters:",
      "studio.rows_label": "Data rows:",
      "studio.live_preview": "Preview",
      "dlg.save_title": "Save the template to your tenant",
      "dlg.save_button": "Save the template",
      "studio.tab_template": "Report template",
      "studio.tab_data": "Data and parameters (JSON)",
      "usage.title": "Usage and quotas",
      "usage.subtitle": "What this tenant has consumed in the current billing month",
      "usage.refresh": "🔄 Refresh",
      "usage.load_failed": "The figures could not be loaded, so none are shown. Check that the active tenant's key is the right one.",
      "usage.plan": "Current plan",
      "usage.used": "Used this month",
      "usage.remaining": "Quota remaining",
      "usage.resets": "resets at the end of the month",
      "usage.volume": "Volume generated",
      "usage.of_quota": "of {quota} a month",
      "usage.total_requests": "{n} requests in total",
      "usage.cycle": "Quota used this billing cycle",
      "keys.title": "API keys",
      "keys.subtitle": "Manage the credentials this browser is using",
      "keys.active_label": "Active tenant secret key:",
      "keys.copy": "Copy key",
      "keys.auth_hint": "Authenticate your requests by sending this token in <code class=\"text-slate-300 font-mono\">X-API-Key</code>.",
      "keys.disconnect": "Disconnect this browser",
      "keys.revoke_note": "This only forgets the key on this computer; the tenant and its documents stay as they are. To revoke a tenant for good, an administrator does it from the admin console.",
      "keys.disconnect_confirm": "Forget the key for \"{tenant}\" on this computer? The tenant itself is not touched, and you can paste the key back in later.",
      "keys.disconnect_done": "This browser has forgotten the key. The tenant is untouched.",
      "keys.demo_cannot_disconnect": "This is one of the example tenants built into the page, not yours. Create a sandbox to get a key of your own.",
      "keys.stripe_title": "💳 Subscribe with Stripe",
      "keys.stripe_badge": "Self-service",
      "keys.stripe_body": "Need more than 25,000 documents, multi-tenant quotas or a 99.9% SLA? Activate Launch ($49/mo), Growth ($149/mo) or Scale ($499/mo).",
      "keys.stripe_cta": "See the plans →",
      "keys.sandbox_title": "Create a sandbox",
      "keys.sandbox_body": "Starts immediately, no card. The server generates the identifier and the key, and the key is shown once. <span class=\"text-slate-300\">100 documents a month, 20 requests a minute.</span>",
      "keys.sandbox_org_label": "Organisation name:",
      "keys.sandbox_plan": "Sandbox &mdash; for production, <a href=\"/licensing\" class=\"text-emerald-400 hover:underline\">subscribe</a>",
      "keys.sandbox_create": "+ Create sandbox",
      "quickstart.title": "Integration and quickstart",
      "quickstart.subtitle": "Copy ready-made code snippets carrying your active key",
      "nav.how": "How it works",
      "nav.uses": "What it is for",
      "nav.variants": "Ways to use it",
      "docs.docker_intro": "Or run the whole engine on your own machine, right now:",
      "portal.back_step1": "Back to editing credentials",
      "portal.expires_in": "Expires in:",
      "nav.features": "Features",
      "nav.benchmarks": "Benchmarks",
      "nav.conformance": "Conformance",
      "conf.badge": "Measured Conformance",
      "conf.title": "We publish our compatibility figures, and how we got them",
      "conf.subtitle": "&ldquo;100% compatible&rdquo; is a claim. These are measurements, each reproducible by one command, run in CI on every commit. Including the one that is not 100%.",
      "conf.suites_label": "Feature suites",
      "conf.suites_note": "One case per feature, each classed supported, <b>ignored</b> or rejected. The middle one is the one that matters: the template renders without error and the content is missing in silence. We wrote these cases, so 100% here is necessary and not sufficient.",
      "conf.birt_label": "Real BIRT designs, written by others",
      "conf.text_on_page": "of template text reaches the page",
      "conf.designs": "Designs",
      "conf.parse": "Parse",
      "conf.render": "Render",
      "conf.birt_note": "The Eclipse project&rsquo;s own sample designs. The one that does not render uses <code class=\"text-cyan-300\">sum</code> as an expression function, which this engine will not evaluate &mdash; it runs a fixed set of operations and no arbitrary code, deliberately.",
      "conf.crystal_label": "Real SAP reports, from the binary .rpt",
      "conf.convert_render": "convert and render",
      "conf.objects": "Objects recovered",
      "conf.text_pdf": "Text reaching the PDF",
      "conf.crystal_note": "The reports SAP ships with Business One, interpreted from the proprietary binary with no SAP software anywhere. <b>81% and not 96%</b>: the six missing strings are all in two budget reports, formula placeholders clipped by boxes their designer sized for the short value the formula resolves to. In the other forty-two, every string reaches the page.",
      "conf.link": "Read the figures with the command that reproduces each one &rarr;",
      "nav.calculator": "ROI Calculator",
      "nav.docs": "Documentation",
      "nav.faqs": "FAQs",
      "nav.pricing": "Pricing & Plans",
      "nav.community": "Community",

      // Hero Section
      "hero.badge_compatibility": "Works with the report templates you already have",
      "hero.title_part1": "Your invoices and reports,",
      "hero.title_gradient": "produced for you.",
      "hero.subtitle": "Connect the templates you already use and get the finished document back: PDF, Excel or Word. No rewriting your reports, and no reporting server to keep alive.",
      "hero.cta_try": "Try it free",
      "hero.cta_how": "See how it works",
      "hero.cta_talk": "Talk to us",
      "hero.compat_label": "Reads your existing templates from",

      // How it works
      "how.title": "Three steps, and the document is done",
      "how.subtitle": "Whatever your business already sends out \u2014 invoices, statements, reports \u2014 comes out of here. One at a time, or a hundred thousand a month.",
      "how.step1_title": "Bring the template you already have",
      "how.step1_body": "The one your team built in JasperReports, Crystal Reports or BIRT. Exactly as it is, with its logo, its columns and its legal small print. Nobody has to redesign anything.",
      "how.step2_title": "Send it the data",
      "how.step2_body": "Your own system sends the customer, the amounts, the dates. It takes one call, and we hand your developers the pieces ready-made.",
      "how.step3_title": "Get the finished document",
      "how.step3_body": "PDF, Excel, Word, HTML or CSV. Ready to send, to file, or to sign. In thousandths of a second, so nobody is left waiting.",
      "how.crystal_title": "Coming from Crystal Reports?",
      "how.crystal_body": "Your <code class=\"text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded font-mono text-sm\">.rpt</code> files keep working, with no SAP licence and no Windows machine kept alive just to print. We took 44 real reports and all 44 came out.",
      "how.crystal_cta": "See what we measured",

      // What it is used for
      "uses.title": "What people put through it",
      "uses.subtitle": "Anything that has to come out the same every time, and has to be right.",
      "uses.billing_title": "Invoicing",
      "uses.billing_body": "Thousands of invoices a month, each in the layout its country's tax office demands.",
      "uses.statements_title": "Statements",
      "uses.statements_body": "The monthly account statement a bank or a fintech sends every customer, on the day it is due.",
      "uses.reports_title": "Management reports",
      "uses.reports_body": "The same reports the business already reads, produced on their own instead of by hand every month.",
      "uses.archive_title": "Documents that must be kept",
      "uses.archive_body": "PDF/A for long-term archiving, and digital signatures where the law asks for them.",
      "uses.cta_variants": "The three ways to use it",

      // The three variants: engine, API and platform
      "variants.title": "Three ways to use it",
      "variants.subtitle": "The same engine underneath. What changes is how much of it you run yourself.",
      "variants.api_kicker": "The API",
      "variants.api_title": "You call, we produce",
      "variants.api_body": "Nothing to install. Your system sends the data and gets the finished document back. We keep it running, and you pay for what you use.",
      "variants.api_for": "<strong class=\"text-white\">Right for you if</strong> you want documents going out this week and would rather not run one more thing.",
      "variants.api_price": "Free to try, then from $49 a month",
      "variants.platform_kicker": "The platform",
      "variants.platform_title": "The API, and the screens around it",
      "variants.platform_body": "Everything in the API, plus a console for managing templates, a portal for your own customers, and separation between them, so each one only ever sees their own documents.",
      "variants.platform_for": "<strong class=\"text-white\">Right for you if</strong> you are not only producing your own documents, but offering them to your customers as part of your product.",
      "variants.platform_price": "From $149 a month",
      "variants.engine_kicker": "The engine",
      "variants.engine_title": "The same software, on your own machines",
      "variants.engine_body": "Installed inside your own application, or as a container in your data centre. Your data never leaves the building, and it runs with no connection to the outside world at all.",
      "variants.engine_for": "<strong class=\"text-white\">Right for you if</strong> the rules you work under, or your own, say the documents cannot leave your premises: banking, government, healthcare.",
      "variants.engine_price": "Annual licence",
      "variants.cta_pricing": "See the prices",
      "variants.switch_note": "Your templates are the same in all three, so starting on the API and bringing it in-house later costs you no rework.",

      // Metrics Cards
      "metrics.cold_start.title": "Cold Start Latency",
      "metrics.cold_start.sub": "0.069-0.263 s across five pods; ~0.07 s once the image is on the node",
      "metrics.ram.title": "Container RAM Footprint",
      "metrics.ram.sub": "81 MiB read off the engine pod today",
      "metrics.latency.title": "P99 Rendering Latency",
      "metrics.latency.sub": "p50 1.4 ms. A metered licence adds 10-23 ms of counter",
      "metrics.security.title": "Dynamic Code CVEs",
      "metrics.security.sub": "Deterministic AST Sandboxed",

      // ROI Calculator Section
      "calc.badge": "Cloud ROI Estimator",
      "calc.title": "Calculate Your Kubernetes Infrastructure Savings",
      "calc.subtitle": "See how much you save on AWS EKS, GCP GKE, or OKE compute nodes by eliminating JVM runtime overhead.",
      "calc.volume_label": "Monthly Document Volume:",
      "calc.pods_label": "Current JasperReports Replicas (Pods):",
      "calc.ram_label": "RAM Allocated per Pod:",
      "calc.annual_savings_title": "Estimated Annual Cloud Savings",
      "calc.reduction_label": "Infrastructure Cost Reduction",
      "calc.unit_docs": "docs",
      "calc.unit_pods": "pods",
      "calc.unit_gb": "GB",
      "calc.unit_mo": "/ mo",
      "calc.unit_yr": "/ yr",
      "calc.legacy_spend_label": "Current Legacy Cloud Spend:",
      "calc.gmr_spend_label": "GMR Reports Cloud Spend:",
      "calc.btn_sandbox": "Test in Sandbox →",
      "calc.btn_quote": "Get Migration Quote",
      "calc.engine_label": "Current Reporting Engine:",
      "calc.engine_jasper": "JasperReports Server / Tomcat (Classic JVM)",
      "calc.engine_birt": "Eclipse BIRT Runtime (OSGi / Java)",
      "calc.engine_crystal": "Crystal Reports Server / .NET Wrapper",
      "calc.engine_other": "Other HTML/PDF Generator",
      "calc.region_label": "Cloud Region / Provider:",
      "calc.results_header": "Annual Cost Projection",
      "calc.traditional_cost": "Current Infrastructure Cost:",
      "calc.gmr_cost": "Cost with GMR Reports AOT:",
      "calc.net_savings": "Projected Net Savings:",
      "calc.co2_reduction": "Carbon Footprint Reduction:",
      "calc.cta_report": "Get Technical ROI Report",

      // Features Section
      "features.badge": "Architecture & Performance",
      "features.title": "Engineered for Extreme Throughput and Zero Friction",
      "features.subtitle": "Direct drop-in replacement for legacy reporting engines without rewriting your business templates.",
      "features.card1_title": "Deterministic AST Evaluator",
      "features.card1_desc": "Report expressions are evaluated by a parser with a fixed set of operations. No Groovy, no bytecode generated at runtime, nothing reflected into arbitrary classes.",
      "features.card2_title": "Sub-Millisecond AOT Compilation",
      "features.card2_desc": "Templates are pre-compiled to a reflection-free binary at build time, so the first render does not pay for parsing the XML.",
      "features.card3_title": "Universal Multi-Engine Support",
      "features.card3_desc": "Runs JasperReports (.jrxml) and Eclipse BIRT (.rptdesign) as they are. A binary Crystal Reports .rpt is converted server-side by the Migration Toolkit, with nothing to install: 44 of 44 across the reports SAP ships with Business One.",
      "features.card4_title": "Last-Known-Good Resilience",
      "features.card4_desc": "If a broken template is published, the engine keeps serving the last version that compiled rather than failing the request.",
      "features.card5_title": "Cache Synchronised Across Replicas",
      "features.card5_desc": "Compiled templates are shared between pods through Redis, or a shared volume when self-hosted, so an edit made on one replica reaches the rest.",
      "features.card6_title": "Zero-Data Retention",
      "features.card6_desc": "Documents are rendered in memory and streamed back. The data you send to be rendered is not written to disk.",
      "features.card7_title": "Isolated Multi-Tenant Architecture",
      "features.card7_desc": "Credentials per tenant, token-bucket rate limiting, and monthly quota counted in PostgreSQL so every replica enforces the same allowance.",
      "features.card8_title": "Python, TypeScript and .NET SDKs",
      "features.card8_desc": "One render call in each. The report type and the output format are arguments rather than separate methods, so a new report type needs no new SDK release.",
      "features.card9_title": "Vectorial Barcodes and QR Codes",
      "features.card9_desc": "ZXing drawn straight into PDF vectors. No AWT, no X11, nothing in the container that expects a desktop.",
      "features.card10_title": "Streaming Excel (FastExcel)",
      "features.card10_desc": "Generates <code class=\"text-emerald-400\">.xlsx</code> through streaming ZIP compression, so a large workbook does not turn into an OutOfMemoryError.",
      "features.card11_title": "Helm Chart and Kubernetes Operator",
      "features.card11_desc": "A Helm chart for the engine, plus CRDs for report clusters and for templates.",

      // Documentation Hub
      "docs.badge": "Documentation Hub",
      "docs.title": "Get Started in Under 60 Seconds",
      "docs.spring_title": "Spring Boot 3 Starter Integration",
      "docs.spring_desc": "Add our official starter to your Maven or Gradle build for automatic bean configuration:",
      "docs.spring_inject": "Inject service bean into your controller:",
      "docs.docker_title": "Docker Multi-Architecture Images (ARM64 & AMD64)",
      "docs.docker_desc": "Run locally on Apple Silicon (M1-M4) or deploy to AWS Graviton with zero emulation overhead:",
      "docs.quarkus_title": "Quarkus Reactive Extension & Native Binary",
      "docs.quarkus_desc": "Compile to an ultra-lightweight native binary that starts in under 300 ms cold, and in about 70 ms once the image is on the node:",
      "docs.helm_title": "Enterprise Kubernetes & Helm Chart",
      "docs.helm_desc": "Deploy with horizontal autoscaling (HPA) and shared PVC synchronization:",
      "docs.sdks_title": "Official TypeScript and Python SDKs",
      "docs.sdks_desc": "Built-in retry logic handling HTTP 429 rate-limit backoff:",
      "docs.migration_title": "JasperReports (.jrxml) Migration Checklist",
      "docs.migration_item1": "Zero Template Rewrites: Keep your Jaspersoft Studio designs.",
      "docs.migration_item2": "Fields & Parameters: $F{field}, $P{param}, $V{var} evaluated deterministically.",
      "docs.migration_item3": "Subreports & Barcodes: Native OpenPDF and ZXing vector drawing.",
      "docs.migration_item4": "No Dynamic Groovy: Replaces dangerous dynamic compilation with safe AST mathematical expressions.",

      // Benchmarks Section
      "benchmarks.badge": "Measured in Production",
      "benchmarks.title": "What a Native Reporting Engine Actually Costs to Run",
      "benchmarks.subtitle": "Figures read from our own production pods on Kubernetes (OCI OKE, ARM64 Ampere A1). Method and raw readings are published.",
      "benchmarks.measured_on": "Measured on:",
      "benchmarks.per_items": "p99, per document",
      "benchmarks.seconds": "seconds",
      "benchmarks.col_engine": "Reporting Engine",
      "benchmarks.col_cold_start": "Cold Start",
      "benchmarks.col_ram": "RAM Footprint",
      "benchmarks.col_p99": "P99 Latency (1k docs)",
      "benchmarks.col_throughput": "Throughput (docs/sec)",

      // Pricing Section
      "pricing.badge": "Cloud Platform & On-Premise Licensing",
      "pricing.title": "Transparent Plans for Every Scale",
      "pricing.subtitle": "From ultra-fast serverless APIs to embedded Java/Quarkus components for banking and air-gapped networks.",
      "pricing.saas_header": "GMR Cloud SaaS — Multi-Tenant Managed APIs",
      "pricing.onprem_header": "On-Premise & Sovereign Cloud Licenses (Air-Gapped)",
      "pricing.per_month": "/ mo",
      "pricing.popular_badge": "Most Popular",
      "pricing.subscribe": "Subscribe",
      "pricing.try_sandbox": "Try in Sandbox",
      "pricing.contact_sales": "Contact Sales",
      "pricing.plan_free_title": "Developer Free",
      "pricing.plan_free_desc": "For technical evaluation and local microservices.",
      "pricing.plan_free_feat1": "1,500 documents / month",
      "pricing.plan_free_feat2": "60 req/min (burst 10)",
      "pricing.plan_free_feat3": "Studio Sandbox Web UI",
      "pricing.plan_free_feat4": "Multi-architecture Docker images",
      "pricing.plan_free_feat5": "Community Support on GitHub",
      "pricing.plan_launch_title": "Launch",
      "pricing.plan_launch_desc": "For MVPs, startups, and agile invoicing apps.",
      "pricing.plan_launch_feat1": "25,000 documents / month",
      "pricing.plan_launch_feat2": "150 req/min (burst 25)",
      "pricing.plan_launch_feat3": "$0.0025 / extra doc",
      "pricing.plan_launch_feat4": "Unlimited API Keys",
      "pricing.plan_launch_feat5": "Webhook Alerts & Email Support",
      "pricing.plan_growth_title": "Growth",
      "pricing.plan_growth_desc": "For scaling fintechs and multi-tenant SaaS platforms.",
      "pricing.plan_growth_feat1": "100,000 documents / month",
      "pricing.plan_growth_feat2": "400 req/min (burst 60)",
      "pricing.plan_growth_feat3": "$0.0018 / extra doc",
      "pricing.plan_growth_feat4": "Multi-Tenancy & Custom Fonts",
      "pricing.plan_growth_feat5": "Zero-Data Retention (ZDR) & 99.9% SLA",
      "pricing.plan_scale_title": "Scale",
      "pricing.plan_scale_desc": "For mission-critical, high-volume enterprise document workloads.",
      "pricing.plan_scale_feat1": "500,000 documents / month",
      "pricing.plan_scale_feat2": "1,000 req/min (burst 150)",
      "pricing.plan_scale_feat3": "$0.0012 / extra doc",
      "pricing.plan_scale_feat4": "Guaranteed 99.9% Uptime SLA",
      "pricing.plan_scale_feat5": "24/7 Dedicated Support & Onboarding",
      "pricing.plan_free_cta": "Try in Sandbox",
      "pricing.plan_launch_cta": "Subscribe Launch ($49/mo)",
      "pricing.plan_growth_cta": "Subscribe Growth ($149/mo)",
      "pricing.plan_scale_cta": "Subscribe Scale ($499/mo)",
      "pricing.billed_annually": "billed annually",
      "pricing.onprem_badge": "On-Premise Component Licensing",
      "pricing.onprem_title": "Embedded Libraries, Containers & Air-Gapped Core",
      "pricing.onprem_desc": "Engineered for Core Banking, government agencies, and data centers requiring strict local processing with zero external telemetry (strict ZDR, FIPS 140-2, and PAdES digital signatures).",
      "pricing.onprem_guide_btn": "Technical & Licensing Guide ↗",
      "pricing.onprem_starter_title": "Starter On-Prem",
      "pricing.onprem_starter_sub": "Microservices / Single Server",
      "pricing.onprem_starter_cta": "Request Starter License",
      "pricing.onprem_cluster_title": "Cluster Enterprise HA",
      "pricing.onprem_cluster_sub": "Kubernetes & OpenShift Cluster",
      "pricing.onprem_cluster_badge": "Recommended for Banking",
      "pricing.onprem_cluster_cta": "Request Enterprise Pilot",
      "pricing.onprem_corp_title": "Corporate Unlimited",
      "pricing.onprem_corp_sub": "Mission-Critical & Core Banking",
      "pricing.onprem_corp_cta": "Contact Corporate Engineering",

      // FAQs
      "faqs.badge": "Technical Questions Answered",
      "faqs.title": "Frequently Asked Questions",
      "faqs.subtitle": "Technical & Licensing Inquiries",
      "faqs.q1": "Do we need to rewrite our existing JasperReports templates?",
      "faqs.a1": "No. GMR Reports was explicitly engineered to ingest standard <code class=\"text-emerald-400\">.jrxml</code> files generated by Jaspersoft Studio. Bands, expressions, parameters, totals, and barcodes render drop-in without template redesign.",
      "faqs.q2": "How does the Last-Known-Good Fallback protect production?",
      "faqs.a2": "If a corrupted or invalid XML template is uploaded to a shared volume or hot-reloaded during live operations, GMR Reports detects the parsing failure, raises an alert, and seamlessly continues serving the last valid compiled version in memory. Production document flows never crash.",
      "faqs.q3": "Can we deploy on Oracle Cloud (OCI), AWS Graviton, and Apple Silicon?",
      "faqs.a3": "Yes! Our official Docker images on GHCR are multi-architecture (<code class=\"text-emerald-400\">linux/amd64</code> and <code class=\"text-emerald-400\">linux/arm64</code>). In fact, GMR Reports can run in the OCI Always Free tier consuming less than 1% of the allocated 24GB RAM.",
      "faqs.q4": "What is the difference between Community and Enterprise licensing?",
      "faqs.a4": "The Community Edition is free for evaluation and development with public artifacts on Maven Central. The Enterprise Edition provides air-gapped self-hosted Kubernetes Helm licenses, unlimited rendering, Redis/Hazelcast cluster sync, FIPS/banking compliance, and 24/7 dedicated engineering SLAs.",

      // Footer
      "footer.desc": "High-Performance AOT Document & Invoicing Engine. Natively compiled with GraalVM Native for low latency, running existing JasperReports, BIRT and Crystal templates.",
      "footer.product": "Product",
      "footer.platform": "Platform & SaaS",
      "footer.resources": "Resources",
      "footer.legal": "Legal & Security",
      "footer.legal_compliance": "Legal & Compliance",
      "footer.terms": "Terms of Service",
      "footer.privacy": "Privacy Policy",
      "footer.sla": "Service Level Agreement (99.9% SLA)",
      "footer.licensing": "On-Premise Licensing",
      "footer.corporate_contact": "Corporate Contact",
      "footer.contact_ecuador": "Ecuador (Dollarized Economy / Direct USD Invoicing).",
      "footer.email_label": "Email:",
      "footer.support_label": "Support:",
      "footer.gateway_label": "Gateway:",
      "footer.rights": "All rights reserved.",

      // Modals (Checkout & Lead Capture)
      "modal.checkout_title": "Subscription Provisioning",
      "modal.checkout_subtitle": "Instant API Key & Platform Access",
      "modal.company_label": "Company / Organization Name *",
      "modal.billing_email_label": "Billing Work Email *",
      "modal.tenant_id_label": "Tenant ID (API Handle) *",
      "modal.payment_method_label": "Payment & Provisioning Method",
      "modal.pay_stripe_title": "Stripe Checkout 💳",
      "modal.pay_stripe_desc": "Instant Card Payment",
      "modal.pay_invoice_title": "Proforma Invoice (Net 30) 🏢",
      "modal.pay_invoice_desc": "Bank Wire / SWIFT Transfer",
      "modal.btn_activate": "Activate Subscription & Issue API Key",
      "modal.terms_notice": "Encrypted with 256-bit TLS. By subscribing you agree to the Terms of Service and 99.9% Production SLA.",
      "modal.success_title": "Account Provisioned & Active!",
      "modal.success_subtitle": "Your production API key is ready for immediate document rendering.",
      "modal.your_key_label": "Your Live API Key:",
      "modal.btn_copy": "📋 Copy",
      "modal.btn_copied": "✓ Copied!",
      "modal.key_warning": "Store this key securely. You can also pass it in the X-API-Key or Authorization: Bearer header.",
      "modal.curl_label": "Instant cURL Verification:",
      "modal.btn_open_studio": "🚀 Open in Studio Sandbox",
      "modal.btn_done": "Done",
      "modal.lead_title": "Schedule Architecture Demo & Pilot",
      "modal.lead_calendar_callout": "Prefer an instant 15-min call with our founders?",
      "modal.lead_calendar_btn": "Book Calendar ↗",
      "modal.lead_name_label": "Your Full Name *",
      "modal.lead_work_email_label": "Work Email *",
      "modal.lead_company_label": "Company / Organization *",
      "modal.lead_role_label": "Your Role",
      "modal.lead_role_cto": "CTO / VP Engineering",
      "modal.lead_role_architect": "Software Architect",
      "modal.lead_role_lead": "Tech Lead / Senior Dev",
      "modal.lead_role_devops": "DevOps / Cloud Platform",
      "modal.lead_role_product": "Product / Billing Owner",
      "modal.lead_plan_label": "Plan / Topic of Interest",
      "modal.lead_volume_label": "Monthly Document Volume",
      "modal.lead_engine_label": "Current Reporting Engine",
      "modal.lead_notes_label": "Project Details or Requirements (Optional)",
      "modal.lead_notes_placeholder": "e.g. Migrating 40 JRXML files to Kubernetes, cold-start latency requirements...",
      "modal.lead_btn_submit": "Request Technical Pilot & Callback",

      // Customer Portal Specifics
      "portal.title": "Customer Portal — GMR Reports SaaS",
      "portal.header_title": "Customer Portal",
      "portal.header_subtitle": "Subscription management, real-time consumption and invoicing",
      "portal.login_title": "Corporate Tenant Authentication",
      "portal.login_subtitle": "Enter your corporate tenant credentials to manage your subscription.",
      "portal.tenant_key_label": "API Key or Tenant ID",
      "portal.password_label": "Corporate Tenant Password",
      "portal.show_pwd": "Show",
      "portal.hide_pwd": "Hide",
      "portal.btn_continue_2fa": "Continue to 2FA Verification",
      "portal.quick_demo": "Quick Testing Access (Demo)",
      "portal.step2_title": "2FA Security Verification",
      "portal.step2_subtitle": "We have dispatched a 6-digit verification code to your registered email.",
      "portal.otp_label": "Security Code (OTP)",
      "portal.btn_verify_login": "Verify & Enter Portal",
      "portal.resend_code": "Didn't receive the code? Resend OTP",
      "portal.tab_overview": "Overview & Usage",
      "portal.tab_invoices": "Invoices & Receipts",
      "portal.tab_security": "Security & Credentials",
      "portal.metric_monthly_docs": "Documents This Month",
      "portal.metric_quota_remaining": "Remaining Quota",
      "portal.metric_active_plan": "Subscribed Plan",
      "portal.metric_next_billing": "Next Billing Date",
      "portal.invoices_title": "Billing History & Tax Invoices",
      "portal.table_invoice_num": "Invoice #",
      "portal.table_date": "Date",
      "portal.table_period": "Service Period",
      "portal.table_amount": "Total",
      "portal.table_status": "Status",
      "portal.table_action": "Invoice PDF",
      "portal.btn_change_plan": "Change Plan",
      "portal.btn_cancel_sub": "Cancel Subscription",

      // Developer Console Specifics
      "console.title": "GMR Reports — Developer Console & Studio Sandbox",
      "console.header_title": "GMR Reports Studio",
      "console.header_subtitle": "High-Performance AOT Engine",
      "console.active_tenant": "Active Tenant:",
      "console.tab_studio": "🎨 Studio",
      "console.tab_usage": "📊 Usage and quotas",
      "console.tab_keys": "🔑 API keys",
      "console.tab_quickstart": "🚀 SDKs and quickstart",
      "console.engine_selector": "Template Engine:",
      "console.reset_sample": "Reset Sample",
      "console.btn_render_pdf": "Render Live PDF",
      "console.ai_assist_title": "AI Template Assistant",
      "console.ai_prompt_placeholder": "Describe the report layout you need (e.g. B2B Invoice with tax breakdown and QR code)...",
      "console.ai_generate_btn": "Generate Template with AI",
      "console.json_data_title": "Test Data (JSON Payload)",
      "console.pdf_preview_title": "Rendered Document Preview",

      // Master Ops Admin Specifics
      "admin.title": "GMR Reports — Platform Administration Panel",
      "admin.header_title": "Administration Console",
      "admin.header_subtitle": "Master control for tenants, subscriptions, support and billing",
      "admin.restricted_badge": "MASTER CONTROL ZONE — RESTRICTED",
      "admin.sso_title": "Mandatory SSO Authentication",
      "admin.sso_desc": "Access to the GMR Reports administration console requires federated identity authentication authorized on the platform whitelist.",
      "admin.sync_cluster": "Sync Cluster",
      "admin.tab_tenants": "Tenant Management",
      "admin.tab_whitelist": "Admin Whitelist",
      "admin.tab_metrics": "Cluster Metrics",
      "admin.tab_audit": "Audit Logs"
    }
  };

  /**
   * Determine initial language based on URL query, localStorage, or browser preference
   */
  function getInitialLanguage() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang && SUPPORTED_LANGS.includes(urlLang.toLowerCase())) {
        return urlLang.toLowerCase();
      }

      const storedLang = localStorage.getItem(STORAGE_KEY);
      if (storedLang && SUPPORTED_LANGS.includes(storedLang)) {
        return storedLang;
      }

      const browserLang = (navigator.language || navigator.userLanguage || '').slice(0, 2).toLowerCase();
      if (SUPPORTED_LANGS.includes(browserLang)) {
        return browserLang;
      }
    } catch (e) {
      console.warn('[i18n] Error reading language preference:', e);
    }
    return DEFAULT_LANG;
  }

  let currentLanguage = getInitialLanguage();

  /**
   * Get translation for a given key, with fallback to Spanish and key itself
   */
  function t(key, defaultValue) {
    if (!key) return '';
    const langDict = translations[currentLanguage] || translations[DEFAULT_LANG];
    if (langDict && langDict[key] !== undefined) {
      return langDict[key];
    }
    const fallbackDict = translations[DEFAULT_LANG];
    if (fallbackDict && fallbackDict[key] !== undefined) {
      return fallbackDict[key];
    }
    return defaultValue !== undefined ? defaultValue : key;
  }

  /**
   * Apply translations to the current DOM document
   */
  function applyTranslations() {
    document.documentElement.lang = currentLanguage;

    // Elements with data-i18n (text content)
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        el.textContent = t(key, el.textContent);
      }
    });

    // Elements with data-i18n-html (safe HTML content)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (key) {
        el.innerHTML = t(key, el.innerHTML);
      }
    });

    // Elements with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) {
        el.setAttribute('placeholder', t(key, el.getAttribute('placeholder')));
      }
    });

    // Elements with data-i18n-title
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (key) {
        el.setAttribute('title', t(key, el.getAttribute('title')));
      }
    });

    // Elements with data-i18n-aria
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      if (key) {
        el.setAttribute('aria-label', t(key, el.getAttribute('aria-label')));
      }
    });

    // Update language selector UI if present
    updateSelectorUI();

    // Dispatch global event for custom components
    window.dispatchEvent(new CustomEvent('gmr:languageChanged', { detail: { lang: currentLanguage } }));
  }

  /**
   * Set active language, store in localStorage, and re-translate DOM
   */
  function setLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) return;
    currentLanguage = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      console.warn('[i18n] Error saving language preference:', e);
    }
    applyTranslations();
  }

  /**
   * Update all language selector buttons/dropdowns in the document
   */
  function updateSelectorUI() {
    document.querySelectorAll('.gmr-lang-btn').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === currentLanguage) {
        btn.classList.add('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/40', 'font-bold');
        btn.classList.remove('text-slate-400', 'hover:text-white', 'border-transparent');
      } else {
        btn.classList.remove('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/40', 'font-bold');
        btn.classList.add('text-slate-400', 'hover:text-white', 'border-transparent');
      }
    });
  }

  /**
   * Generates HTML markup for an elegant, accessible language selector
   */
  function renderLanguageSelector(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = `
      <div class="inline-flex items-center rounded-lg bg-slate-900/80 border border-slate-700/60 p-0.5 text-xs shadow-inner" role="group" aria-label="Selector de Idioma / Language Selector">
        <button type="button" onclick="GMR_I18N.setLanguage('es')" data-lang="es" class="gmr-lang-btn px-2 py-1 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1 border">
          <span>🇪🇸</span> <span>ES</span>
        </button>
        <button type="button" onclick="GMR_I18N.setLanguage('en')" data-lang="en" class="gmr-lang-btn px-2 py-1 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1 border">
          <span>🇺🇸</span> <span>EN</span>
        </button>
      </div>
    `;
    updateSelectorUI();
  }

  // Expose API globally
  window.GMR_I18N = {
    t,
    setLanguage,
    getCurrentLanguage: () => currentLanguage,
    applyTranslations,
    renderLanguageSelector,
    translations
  };

  // Auto-run once DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTranslations);
  } else {
    applyTranslations();
  }

})(window, document);
