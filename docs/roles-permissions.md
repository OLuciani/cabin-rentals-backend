# Roles y Permisos - Cabañas Rental Backend

Este documento define los roles de usuario y los permisos asociados en el sistema de gestión de cabañas.

## Roles del sistema

### 1. Administrador General / Dueño de Cabañas
- Accede a todas las funcionalidades del sistema.
- Administra su cuenta y los datos de las cabañas.
- Puede crear, editar y eliminar cabañas.
- Puede gestionar precios, promociones y disponibilidad.
- Visualiza y gestiona todas las reservas.
- Administra a otros usuarios (empleados y subadministradores).
- Puede invitar a otras personas a unirse como:
  - Subadministrador
  - Empleado

### 2. Subadministrador
- Invitado por el Administrador General.
- Tiene acceso limitado a la administración:
  - Puede ver y gestionar reservas.
  - Puede ver y editar información de cabañas.
- No puede:
  - Eliminar cabañas.
  - Modificar configuración general de la cuenta.
  - Administrar otros usuarios.

### 3. Empleado
- También invitado por el Administrador General.
- Permisos muy limitados:
  - Solo puede visualizar las reservas asignadas.
  - Puede marcar reservas como confirmadas o completadas.
- No tiene acceso a la edición de cabañas ni usuarios.

### 4. Usuario Cliente
- Se registra para buscar cabañas y hacer reservas.
- Puede:
  - Buscar cabañas disponibles por fechas y filtros.
  - Ver información de cabañas.
  - Realizar reservas.
  - Consultar el estado de sus reservas.
  - Editar su información de perfil.

## Consideraciones
- Los permisos pueden ampliarse o ajustarse en el futuro según las necesidades del negocio.
- Cada acción sensible (crear, editar, eliminar) debe ser protegida según el rol correspondiente.
- Los endpoints de la API deben verificar el rol del usuario antes de permitir el acceso.

---

Este archivo se actualizará si se agregan nuevos roles o cambia la lógica de permisos.

