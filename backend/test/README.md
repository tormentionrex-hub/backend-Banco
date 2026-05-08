# Guía de Pruebas de Modelos para QA (Sistema Bancario)

Estimado equipo de QA / Tester,

Este documento explica las pruebas unitarias automatizadas aplicadas a los modelos de datos de nuestro sistema bancario. Como parte del equipo de calidad, es vital que entiendas qué hacen estas pruebas, por qué son críticas para la empresa y qué impacto tendrían en producción si fallaran.

---

## 🏦 Importancia de estas pruebas en nuestra Empresa

En una entidad financiera, la integridad de los datos es sinónimo de dinero y confianza. Un error en un modelo de datos puede resultar en transferencias incorrectas, pérdida de fondos o brechas de seguridad. Estas pruebas aseguran que las reglas básicas de negocio se cumplan **antes** de que cualquier dato toque la base de datos.

---

## 🔍 Detalle de Pruebas por Modelo y su Impacto

A continuación se explica qué se testea en cada modelo, por qué es vital y qué pasaría en producción si falla.

### 1. Modelo: `Usuario`
*   **¿Qué se testea?** Que el email sea válido, que los campos obligatorios (nombre, DNI, password) existan y que no se creen usuarios con datos vacíos.
*   **¿Por qué debe estar testeado?** Un banco no puede permitirse usuarios con correos falsos o sin identificación (DNI).
*   **Impacto en Producción si falla:** Si una validación falla y se permite un usuario sin DNI, podríamos incurrir en problemas legales de lavado de dinero (KYC) o permitir suplantación de identidad.

### 2. Modelo: `Cuenta`
*   **¿Qué se testea?** Que el tipo de cuenta sea solo 'ahorro' o 'corriente' y que tenga un número de cuenta asignado.
*   **¿Por qué debe estar testeado?** Las operaciones financieras dependen del tipo de cuenta para aplicar comisiones e intereses específicos.
*   **Impacto en Producción si falla:** Si se crea una cuenta con un tipo inválido, los procesos automáticos de cobro de intereses o comisiones fallarán, generando pérdidas económicas para el banco o reclamos de clientes.

### 3. Modelo: `Tarjeta`
*   **¿Qué se testea?** Que el tipo sea 'debito' o 'credito' y que tenga fecha de expiración obligatoria.
*   **¿Por qué debe estar testeado?** Para evitar que se emitan tarjetas con datos incompletos en el sistema.
*   **Impacto en Producción si falla:** Tarjetas sin fecha de expiración bloquearían las pasarelas de pago (como Visa/Mastercard), impidiendo que los clientes realicen compras.

### 4. Modelo: `Transaccion`
*   **¿Qué se testea?** Que el tipo de transacción sea válido ('deposito', 'retiro', 'transferencia') y que tenga un monto asociado.
*   **¿Por qué debe estar testeado?** Es el núcleo del movimiento de dinero en el banco.
*   **Impacto en Producción si falla:** Si se procesa una transacción sin monto o con tipo inválido, el balance general del banco no cuadrará. Esto representa una catástrofe contable y auditorías fallidas.

### 5. Modelo: `Movimiento`
*   **¿Qué se testea?** Que cada movimiento esté ligado a una transacción y una cuenta, y que el tipo sea 'debito' o 'credito'.
*   **¿Por qué debe estar testeado?** Es el historial de auditoría (el "extractor") de cada cuenta.
*   **Impacto en Producción si falla:** El cliente verá que se le descontó dinero pero no sabrá en qué (movimiento huérfano). Esto genera desconfianza masiva y colapso en el soporte técnico.

### 6. Modelo: `Prestamo`
*   **¿Qué se testea?** Que tenga monto solicitado, tasa de interés y plazo definidos.
*   **¿Por qué debe estar testeado?** Un préstamo sin tasa de interés o sin plazo es dinero que el banco regala.
*   **Impacto en Producción si falla:** Pérdida financiera directa y masiva para el banco si se otorgan créditos con tasa 0% por error de sistema.

### 7. Modelo: `PagoPrestamo`
*   **¿Qué se testea?** Que registre el monto pagado y el número de cuota correspondiente.
*   **¿Por qué debe estar testeado?** Para llevar el control estricto de la deuda del cliente.
*   **Impacto en Producción si falla:** Podríamos cobrarle doble a un cliente o reportar falsamente a los clientes como morosos ante las centrales de riesgo.

---

## 🚨 ¿Qué hacer si una prueba falla?

Si al ejecutar las pruebas ves que una de ellas falla (marcada en ROJO):

1.  **Identifica el Modelo:** Mira el nombre del archivo que falló (ej. `Usuario.test.js`).
2.  **Revisa el Error:** Jest te dirá exactamente qué validación falló (ej. `email is invalid`).
3.  **Acción Inmediata:**
    *   **Bloquear el Despliegue:** Una prueba fallando NO debe llegar a producción bajo ninguna circunstancia.
    *   **Reportar al Desarrollador:** Abre un reporte indicando el modelo y la validación que falló.
    *   **Verificar Reglas de Negocio:** Pregunta si el fallo se debe a un cambio reciente en las políticas del banco (ej. si ahora se permite un nuevo tipo de cuenta).

---

## 🚀 Comando para el Tester
Para correr estas pruebas y verificar la salud de los modelos:

npm test
