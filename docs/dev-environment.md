# Configuración del entorno de desarrollo

Este documento describe cómo está configurado el entorno de desarrollo del proyecto **cabanas-rental-backend** utilizando TypeScript, Nodemon y ts-node.

---

## Estructura general del proyecto

```
/
├── src/               ← Código fuente TypeScript
├── dist/              ← Código transpilado a JavaScript (generado automáticamente)
├── docs/              ← Documentación interna del proyecto
├── .gitignore         ← Ignora node_modules/, dist/, .env, logs, etc.
├── nodemon.json       ← Configuración para Nodemon en desarrollo
├── package.json       ← Scripts y dependencias del proyecto
├── tsconfig.json      ← Configuración de TypeScript
```

---

## Scripts en `package.json`

```json
"scripts": {
  "start": "node dist/server.js",           // Ejecuta la versión transpilada (producción)
  "dev": "nodemon",                         // Ejecuta con ts-node en desarrollo
  "build": "npx tsc",                      // Transpila el proyecto TS a JS en dist/
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

---

## Configuración de `nodemon.json`

```json
{
  "watch": ["src"],                          // Archivos que nodemon observa
  "ext": "ts",                               // Extensiones que escucha (TypeScript)
  "ignore": ["src/**/*.test.ts"],            // Ignora archivos de prueba
  "exec": "ts-node -r tsconfig-paths/register src/server.ts" // Ejecuta con soporte para alias
}
```

---

## Uso habitual

### Desarrollo
```bash
npm run dev
```
> Inicia el servidor usando `ts-node` con recarga automática gracias a `nodemon`. No se necesita transpilar manualmente.

### Producción
```bash
npm run build     # Transpila todo a JavaScript en /dist
npm start         # Ejecuta el servidor desde dist/server.js
```

> La carpeta `/dist` se genera automáticamente al ejecutar `npm run build`. No debe modificarse manualmente.

---

## Alias de importación

Este proyecto utiliza alias configurados en `tsconfig.json` para facilitar imports más limpios y legibles:

```json
"baseUrl": "./src",
"paths": {
  "@domain/*": ["domain/*"],
  "@config/*": ["config/*"]
}
```

Esto permite escribir:

```ts
import { connectDB } from '@config/database';
```

En lugar de rutas relativas más largas como:

```ts
import { connectDB } from '../../config/database';
```

> `ts-node` con `tsconfig-paths/register` habilita esta funcionalidad durante la ejecución en desarrollo.

---

> Documentado para referencia rápida del entorno de desarrollo.



