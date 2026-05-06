# 🏦 Documentación del Sistema: Backend de Servicios Bancarios Profesionales

## 1. Introducción al Proyecto
Este sistema es el motor central (Backend) de una plataforma financiera moderna. Permite gestionar clientes, cuentas bancarias y realizar transacciones de dinero de forma segura. El objetivo principal es garantizar que cada centavo esté a salvo, por lo que el sistema valida quién es el usuario, qué permisos tiene y si tiene saldo suficiente antes de permitir cualquier movimiento.

## 2. Guía de Instalación y Configuración
Si acabas de descargar el proyecto desde el repositorio (Git), sigue estos pasos para ponerlo en marcha, ya que las carpetas de dependencias y configuraciones sensibles no se suben a la nube:

1.  **Instalar librerías:** Abre una terminal en la carpeta del proyecto y ejecuta:
    ```bash
    npm install
    ```
2.  **Configurar Base de Datos:** Asegúrate de tener MySQL corriendo y que los datos en `config/config.js` coincidan con tu servidor local.
3.  **Preparar la estructura:** Ejecuta las migraciones para crear las tablas automáticamente:
    ```bash
    npx sequelize-cli db:migrate
    ```
4.  **Cargar datos de prueba:** Para que no empieces de cero, ejecuta este script que crea un Administrador y clientes de prueba:
    ```bash
    node seed.js
    ```
5.  **Iniciar el servidor:**
    ```bash
    npm start
    ```

---

## 3. Arquitectura del Sistema (Cómo funciona por dentro)
El proyecto utiliza una estructura organizada para que sea fácil de mantener y escalar:

### **Modelos (Los Cimientos)**
Representan las tablas de la base de datos (Usuarios, Cuentas, Transacciones). 
*   *Ejemplo:* El modelo `Usuario` guarda nombre, email, contraseña cifrada y su **Rol** (quién es y qué puede hacer).

### **Controladores (El Cerebro)**
Aquí reside la lógica. Por ejemplo, al hacer una transferencia, el controlador verifica:
1. ¿Existe la cuenta de origen?
2. ¿Tiene dinero suficiente?
3. Si todo es correcto, resta en una, suma en otra y registra el movimiento. Todo esto ocurre dentro de una **Transacción de Base de Datos**, lo que significa que si algo falla a mitad de camino, no se pierde dinero; el sistema vuelve al estado anterior.

### **Seguridad y JWT (El Guardia de Seguridad)**
Utilizamos **JSON Web Tokens (JWT)**. Cuando un usuario inicia sesión, el sistema le entrega un "pase digital" (token). Este pase es obligatorio para cualquier otra acción.
*   **Autenticación:** ¿Tienes un pase válido?
*   **Autorización:** Tu pase dice que eres "Cliente", por lo tanto, no puedes crear otros usuarios; solo un "Administrador" puede.

---

## 4. Guía de Pruebas (Thunder Client / Postman)
Para probar el sistema de manera sencilla, sigue este orden:

### **Paso 1: Iniciar Sesión (Login)**
Debes identificarte para obtener tu Token de acceso.
*   **URL:** `POST http://localhost:3000/api/auth/login`
*   **Body (JSON):**
    ```json
    {
      "email": "admin@banco.com",
      "password": "admin123"
    }
    ```
*   **Acción:** Copia el código largo (`token`) que aparece en la respuesta.

### **Paso 2: Configurar la Seguridad en tus pruebas**
En cada una de las siguientes peticiones, ve a la pestaña **Auth** o **Headers** y pega el token anterior como un **Bearer Token**. Sin esto, el sistema te dirá "Acceso Denegado".

### **Paso 3: Crear un Cliente (Solo Admin)**
*   **URL:** `POST http://localhost:3000/api/usuarios`
*   **Body (JSON):** Crea un usuario nuevo definiendo su nombre, DNI y email. El sistema hasheará automáticamente la contraseña antes de guardarla.

---

## 5. Resumen Técnico
*   **Lenguaje:** Node.js
*   **Framework Web:** Express.js
*   **Base de Datos:** MySQL con Sequelize ORM.
*   **Seguridad:** JWT y Bcryptjs (Cifrado).
*   **Validaciones:** Control de roles y transacciones atómicas.
