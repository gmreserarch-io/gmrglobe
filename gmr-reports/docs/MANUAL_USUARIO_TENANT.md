# Manual de Usuario del Inquilino (Tenant User Guide)
**GMR Reports Studio & Cloud Platform — Versión 1.3 GA**  
*Motor AOT de Alto Rendimiento para JasperReports, Eclipse BIRT y Crystal Reports*

---

## 1. Introducción y Arquitectura de la Plataforma

GMR Reports es una plataforma de generación y distribución de documentos empresariales de ultra-baja latencia impulsada por compilación nativa en GraalVM/Mandrel.

### 1.1 Conceptos Fundamentales
* **Inquilino (Tenant)**: Espacio de trabajo aislado criptográficamente que pertenece a su organización (ej. *Banco Innovador*). Todos sus datos, plantillas y registros de auditoría están completamente separados de otros clientes.
* **Clave de API (`X-API-Key`)**: Credencial secreta asignada a su organización para autenticar peticiones desde sus sistemas (ERP, CRM o aplicaciones core).
* **Motores Soportados**:
  * **SAP Crystal Reports** (`.rpt` / XML)
  * **JasperReports** (`.jrxml`)
  * **Eclipse BIRT** (`.rptdesign`)

### 1.2 Capacidad de Plantillas por Nivel de Suscripción
| Plan | Cuota Mensual de Documentos | Límite de Plantillas Activas | Rate Limit | Soporte |
| :--- | :--- | :--- | :--- | :--- |
| **Developer Free** | 1,500 docs/mes | Hasta 5 plantillas | 60 req/min | Comunidad |
| **Launch** | 25,000 docs/mes | Hasta 25 plantillas | 150 req/min | Estándar (Email) |
| **Growth / Pro** | 100,000 docs/mes | Hasta 100 plantillas | 400 req/min | Prioritario (8x5) |
| **Scale** | 500,000 docs/mes | Hasta 500 plantillas | 1,500 req/min | Crítico (24x7) |
| **Enterprise Cloud** | 2,000,000+ docs/mes | **Ilimitadas** | 5,000 req/min | SLA 99.99% Dedicado |

---

## 2. Entornos de Trabajo y Acceso Seguro

La plataforma ofrece dos entornos web claramente diferenciados:

```
┌─────────────────────────────────────────────────────────────┐
│  GMR Reports Platform Web                                   │
├──────────────────────────────┬──────────────────────────────┤
│  1. Studio Sandbox (/console)│  2. Portal Clientes (/portal)│
│  • Diseño de plantillas      │  • Acceso corporativo seguro │
│  • Asistente de IA Gemini    │  • Autenticación 2FA OTP     │
│  • Pruebas en memoria volátil│  • Emisión de lotes reales   │
│  • Descarga de archivos      │  • Gestión de claves de API  │
└──────────────────────────────┴──────────────────────────────┘
```

### 2.1 Acceso al Portal Corporativo (`/portal`)
1. Ingrese a la URL institucional de la plataforma (`https://tu-dominio.com/portal`).
2. Introduzca su correo electrónico corporativo registrado.
3. El sistema emitirá un **código de seguridad OTP (One-Time Password)** de 6 dígitos que llegará a su bandeja de entrada con vigencia de 5 minutos.
4. Tras validar el código, su sesión queda protegida mediante un token JWT firmado. Opcionalmente, puede iniciar sesión mediante el **SSO Federado** de su empresa (Google Workspace, Microsoft Azure Entra ID, GitHub o LinkedIn).

---

## 3. Diseño y Creación de Plantillas en Studio Sandbox

El Studio Sandbox (`/console`) le permite crear o importar plantillas de cualquiera de los tres motores.

### 3.1 Uso del Asistente de Inteligencia Artificial (Gemini)
1. En la pestaña **"📝 Plantilla de Reporte"**, presione el botón **"✨ Asistente IA"**.
2. Escriba en lenguaje natural las instrucciones de diseño deseadas. Ejemplos:
   * *"Añade un encabezado institucional con fondo azul marino (#003366) y logo a la izquierda."*
   * *"Agrega una tabla de 5 columnas con bordes sutiles y fila de totales con suma automática."*
   * *"Inserta un código QR que verifique la autenticidad del documento con la URL oficial."*
3. Presione **"Aplicar"**. La IA reescribirá la estructura XML/JRXML manteniendo el 100% de validez sintáctica.

### 3.2 Visualización en Tiempo Real
* En cualquier momento presione **"⚡ Renderizar Reporte"**.
* El motor AOT compilará la plantilla y mostrará el PDF de alta fidelidad en el visor derecho en menos de 20 milisegundos.

---

## 4. Gestión del Ciclo de Vida: Guardar y Descargar

Una vez satisfecho con el diseño de su documento, dispone de dos opciones:

### 4.1 Opción A: Descarga Local (`.jrxml`, `.rpt.xml`, `.rptdesign`)
* Presione el botón **"📥 Descargar"** en la barra superior del editor.
* El navegador descargará de inmediato el archivo nativo en su computadora, listo para ser versionado en su repositorio Git o abierto en herramientas locales como Jaspersoft Studio o Crystal Reports Designer.

### 4.2 Opción B: Guardar en su Tenant Cloud
* Presione el botón **"💾 Guardar en Tenant"**.
* Indique un identificador amigable en minúsculas (ejemplo: `estado-cuenta-clientes`).
* Al confirmar, la plantilla queda registrada en el almacén de su organización y lista para ser llamada por sus sistemas mediante API.
* Puede consultar y abrir sus plantillas guardadas en cualquier momento desde el menú desplegable **"📁 Mis Plantillas"**.

---

## 5. Emisión Masiva y Ejecución de Reportes

### 5.1 Emisión por API REST (Integración de Sistemas Core / Backend)
Para emitir un estado de cuenta o factura desde su backend, realice una solicitud HTTP POST enviando únicamente el dataset:

```http
POST /api/reports/templates/estado-cuenta-clientes/render HTTP/1.1
Host: api.gmrglobe.com
X-API-Key: gmr_live_pro_key_tu_clave_secreta
Content-Type: application/json

{
  "parameters": {
    "PERIODO": "Septiembre 2026",
    "SUCURSAL": "Sede Central"
  },
  "data": [
    {
      "cliente_id": "CLI-1001",
      "nombre": "Acme Industrial S.A.",
      "saldo_anterior": 15000.00,
      "cargos": 2500.00,
      "abonos": 5000.00,
      "saldo_actual": 12500.00
    }
  ]
}
```

### 5.2 Emisión Segura con Contraseña por Cliente (Cifrado AES-128)
Si emite estados de cuenta masivos y requiere que cada PDF esté protegido con la contraseña del cliente respectivo, incluya el parámetro `_pdf_user_password`:

```json
{
  "parameters": {
    "_pdf_user_password": "Ultimos4DigitosDocumento",
    "TITULAR": "Juan Perez"
  },
  "data": [...]
}
```
El PDF se generará con cifrado nativo estándar; nadie sin esa clave podrá abrir ni imprimir el archivo.

---

## 6. Ejemplos de Integración (SDKs Oficiales)

### 6.1 Python
```python
import requests

API_KEY = "gmr_live_pro_key_tu_clave"
BASE_URL = "https://api.gmrglobe.com"

payload = {
    "parameters": {"EMPRESA": "Banco Innovador"},
    "data": [{"cuenta": "100-293-11", "monto": 450.00}]
}

response = requests.post(
    f"{BASE_URL}/api/reports/templates/estado-cuenta-clientes/render",
    headers={"X-API-Key": API_KEY, "Content-Type": "application/json"},
    json=payload
)

if response.status_code == 200:
    with open("estado_cuenta.pdf", "wb") as f:
        f.write(response.content)
    print("✓ PDF generado exitosamente.")
```

### 6.2 Node.js / TypeScript
```typescript
import axios from 'axios';
import * as fs from 'fs';

async function generateReport() {
  const response = await axios.post(
    'https://api.gmrglobe.com/api/reports/templates/estado-cuenta-clientes/render',
    {
      parameters: { EMPRESA: 'Banco Innovador' },
      data: [{ cuenta: '100-293-11', monto: 450.00 }]
    },
    {
      headers: { 'X-API-Key': 'gmr_live_pro_key_tu_clave' },
      responseType: 'arraybuffer'
    }
  );

  fs.writeFileSync('estado_cuenta.pdf', response.data);
  console.log('✓ PDF guardado.');
}
generateReport();
```

---

## 7. Preguntas Frecuentes y Soporte

* **¿Mis datos quedan guardados en los servidores de GMR al generar un reporte?**  
  No. El motor opera bajo el principio de *Zero-Data Retention* para payloads dinámicos: los datos se procesan en memoria volátil de la CPU para estampar el PDF y se liberan de inmediato.
* **¿Qué sucede si supero mi límite de peticiones por minuto?**  
  El gateway responderá con código `HTTP 429 Too Many Requests`. Los SDKs oficiales reintentan automáticamente con backoff exponencial. Si su volumen crece de forma sostenida, puede ascender de plan desde el Portal de Clientes.
