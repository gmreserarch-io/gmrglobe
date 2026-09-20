# Marco Legal y Cláusulas de Protección de Datos (DPA Addendum)
## Integración de Fuentes de Datos Externas (On-Premise & Multi-Cloud)

**Versión:** 1.0.0  
**Fecha de Vigencia:** Septiembre 2026  
**Aprobado por:** GMR Security & Compliance Office  

---

### 1. Objeto y Alcance

El presente documento complementa los Términos de Servicio y define las directrices legales, contractuales y técnicas bajo las cuales **GMR Platform** (el "Encargado del Tratamiento" / *Data Processor*) se conecta a las fuentes de datos externas, repositorios locales (On-Premise) o entornos de nube privada del **Cliente** (el "Responsable del Tratamiento" / *Data Controller*) con el fin exclusivo de compilar y renderizar reportes, estados de cuenta y facturas electrónicas.

Este marco cumple estrictamente con el **Reglamento General de Protección de Datos (GDPR Art. 28)** de la Unión Europea, la **California Consumer Privacy Act (CCPA)** y la legislación bancaria/financiera aplicable sobre secreto bancario y confidencialidad comercial.

---

### 2. Cláusula de Retención Cero (Zero-Data Retention Policy)

1. **Memoria Volátil Exclusiva (Ephemeral In-Memory Processing):**  
   Cualquier dato extraído desde las fuentes externas del Cliente (vía JDBC, REST API o gRPC) reside única y exclusivamente en el búfer de memoria volátil (RAM) asignado al hilo de ejecución del motor AOT.
2. **Inexistencia de Persistencia:**  
   GMR Platform garantiza bajo responsabilidad contractual que los datos extraídos de las fuentes externas **nunca son escritos en disco duro, bases de datos internas, archivos temporales ni sistemas de registro persistentes**.
3. **Destrucción Inmediata tras la Emisión:**  
   Una vez generado el flujo binario del documento final (PDF, XLSX o JSON) y transmitido exitosamente al cliente solicitante, el búfer de memoria transitorio se libera y se sobrescribe de inmediato mediante el recolector de memoria y los ciclos de limpieza del runtime nativo.
4. **Logs Sanitizados:**  
   Los sistemas de telemetría y logging de GMR Platform solo registran metadatos operacionales (tiempo de respuesta en milisegundos, tamaño en bytes del documento generado y código de estado HTTP). Queda terminantemente prohibido el registro de parámetros de consulta, payloads de negocio, nombres o identificaciones personales en los registros de traza.

---

### 3. Principio de Solo Lectura y Protección contra Mutaciones

1. **Bloqueo a Nivel de Conector:**  
   Todas las conexiones JDBC administradas por el motor configuran de manera inmutable el flag `Connection.setReadOnly(true)` previo a la apertura de cualquier sesión de consulta.
2. **Defensa en Profundidad contra DDL/DML:**  
   El motor incorpora un filtro léxico estricto que rechaza y aborta cualquier sentencia SQL que contenga cláusulas de modificación o definición (`INSERT`, `UPDATE`, `DELETE`, `DROP`, `ALTER`, `TRUNCATE`, `CREATE`, `EXEC`, `CALL`), retornando un código de error de seguridad `400 / 403` al instante.
3. **Credenciales con Privilegios Mínimos:**  
   Se exige contractualmente al Cliente aprovisionar usuarios de base de datos con permisos estrictamente limitados a `SELECT` en las vistas o tablas indispensables para la emisión del reporte.

---

### 4. Confidencialidad y Custodia de Credenciales (NDA Addendum)

1. **Información Confidencial Protegida:**  
   Las direcciones IP, nombres de host internos, túneles VPN, certificados mTLS, cadenas de conexión JDBC y tokens de acceso son tratados como Información Confidencial de Máxima Clasificación (*Restricted / Secret*).
2. **Almacenamiento Cifrado en Reposo:**  
   Las referencias a secretos (`secretRef`) son resueltas en tiempo de ejecución a través de variables de entorno de clúster aisladas (`env:`) o gestores de secretos corporativos (HashiCorp Vault / OCI Vault / AWS KMS), utilizando cifrado AES-256-GCM. Las claves secretas nunca se devuelven en texto claro a través de interfaces web ni APIs públicas.

---

### 5. Auditoría y Cumplimiento Normativo

1. **Derecho a Auditoría:**  
   El Cliente o un auditor independiente debidamente acreditado podrá solicitar anualmente la verificación de los controles de retención cero y aislamiento multi-inquilino de GMR Platform.
2. **Notificación de Incidentes:**  
   En caso de cualquier brecha o intento de intrusión que involucre credenciales del Cliente, GMR Platform notificará al Oficial de Seguridad del Cliente en un plazo máximo de doce (12) horas posteriores a la confirmación del incidente.

---

### 6. Legislación Aplicable y Jurisdicción

Este Addendum se rige e interpreta conforme a las leyes acordadas en el contrato marco de licencia de software o suscripción Enterprise, con primacía de las regulaciones internacionales de privacidad aplicables al domicilio de los titulares de los datos.

---

### 7. Marco de Cifrado Extremo a Extremo (E2EE) y Cómputo Confidencial

1. **Cifrado Criptográfico en Tránsito (In-Transit E2EE):**  
   Todo tráfico que fluya entre los orígenes de datos del Cliente y el clúster de procesamiento de GMR Platform está obligado a utilizar túneles IPsec IKEv2 con cifrado `AES-256-GCM` o sesiones mTLS (X.509) sobre TLS 1.3 con secreto perfecto hacia adelante (*Perfect Forward Secrecy*).
2. **Cómputo Confidencial y Aislamiento de Memoria (In-Use Cryptography):**  
   Para clientes bancarios o con requerimientos de confidencialidad estricta, los pods de ejecución residen sobre máquinas virtuales con **Cómputo Confidencial (AMD SEV-SNP / Intel TDX / ARM CCA)**. La memoria RAM del proceso está cifrada por hardware en silicio, imposibilitando la lectura de datos por parte de operadores de nube, hipervisores o intrusos del sistema host.
3. **Cifrado de Documentos de Salida (Output Encryption AES-256):**  
   A solicitud del cliente mediante parámetros de renderizado, el documento generado (PDF) se cifra en memoria antes de ser transmitido utilizando el estándar **AES-256** (ISO 32000-2). El documento solo puede ser desencriptado por el destinatario final mediante su clave privada o contraseña de usuario (*User Password*), garantizando que ningún intermediario de almacenamiento o red pueda acceder a la información.
4. **Firma Digital Avanzada (PAdES / PKCS#7):**  
   Los documentos pueden ser sellados criptográficamente mediante certificados corporativos X.509 alojados en módulos HSM (Hardware Security Module FIPS 140-2 Nivel 3), asegurando la integridad, autenticidad y no repudio legal del documento.
