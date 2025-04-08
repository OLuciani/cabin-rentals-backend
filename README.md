# Backend - Cabin Rentals Project 🏕️

Este es el backend del proyecto **Cabin Rentals**, una aplicación web para la gestión y alquiler de cabañas. Está desarrollado con **Node.js**, **Express.js** y utiliza **MongoDB Atlas** como base de datos. El código está escrito en **TypeScript** y sigue una arquitectura modular inspirada en los principios de Clean Architecture.

---

## 🚀 Tecnologías utilizadas

- **Node.js** - Entorno de ejecución JavaScript
- **Express.js** - Framework para APIs REST
- **MongoDB Atlas** - Base de datos NoSQL en la nube
- **TypeScript** - Tipado estático
- **Firebase Admin SDK** - Validación de tokens y gestión de usuarios
- **Nodemon** - Recarga automática en desarrollo
- **Dotenv** - Manejo de variables de entorno
- **Cors** - Middleware para permitir solicitudes cross-origin
- **Cookie-Parser** - Middleware para manejar cookies

---

## 📁 Estructura del proyecto

```
cabin-rentals-backend/
├── .env                        # Variables de entorno (no debe subirse al repositorio)
├── .env.example                # Ejemplo de configuración del entorno
├── .gitignore
├── dist/                       # Código compilado
├── node_modules/
├── nodemon.json
├── package.json
├── tsconfig.json
└── src/
    ├── app.ts
    ├── index.ts
    ├── server.ts
    ├── config/
    │   └── database.ts
    ├── controllers/
    ├── domain/
    ├── infrastructure/
    ├── middlewares/
    │   └── errorHandler.ts
    ├── routes/
    │   └── example.routes.ts
    ├── services/
    ├── use-cases/
    └── utils/
```

---

## ⚙️ Configuración e instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/cabin-rentals-backend.git
cd cabin-rentals-backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear archivo de entorno

Copiá el archivo `.env.example` y renombralo como `.env`:

```bash
cp .env.example .env
```

Completá los valores con tus datos reales.

#### Variables requeridas (`.env.example`):

```env
PORT=5000
MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/tu-db

# Firebase Admin SDK
FIREBASE_PROJECT_ID=tu_project_id
FIREBASE_CLIENT_EMAIL=tu_client_email@tu_project_id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="tu_clave_privada_con_\\n_en_lugar_de_saltos_de_línea"

# Cookies
COOKIE_NAME=token
COOKIE_SECRET=tu_secreto_para_firmar_cookies
NODE_ENV=development
```

> 🔐 Nota: Si tu clave privada de Firebase contiene saltos de línea (`\n`), asegurate de escaparlos correctamente como `\\n`.

---

## 🚀 Ejecutar en modo desarrollo

```bash
npm run dev
```

El backend se levantará en `http://localhost:5000`.

---

## 🔍 Comprobación rápida

Podés verificar que el servidor está funcionando accediendo al siguiente endpoint:

- **GET** `/api/ping`
- **Respuesta esperada**:
  ```json
  {
    "message": "pong"
  }
  ```

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**.

