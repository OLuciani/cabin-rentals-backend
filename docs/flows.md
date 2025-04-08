# 🗭 Flujos de Usuario - App de Alquiler de Cabañas

## 1. Flujos del Visitante (usuario no logueado)

El visitante accede a la aplicación y puede:

- Ver el listado completo de todas las cabañas (independientemente de su disponibilidad)
- Aplicar filtros opcionales para encontrar cabañas según:
  - Fechas disponibles
  - Cantidad de personas
  - Precio
  - **Ubicación** *(solo si aplica, por ejemplo, si las cabañas están en diferentes zonas geográficas)*

También puede:

- Ver los detalles de cada cabaña: fotos, descripción, comodidades, precio, disponibilidad estimada
- Iniciar sesión o registrarse para poder realizar una reserva

---

## 2. Flujos del Usuario (cliente logueado)

Una vez logueado, el usuario puede:

- Buscar cabañas aplicando los filtros disponibles (fechas, personas, precio, etc.)
- Ver los detalles de una cabaña
- Hacer una reserva:
  - Elegir fechas disponibles
  - Enviar solicitud de reserva
- Ver su historial de reservas:
  - Reservas pasadas y futuras
  - Estado de cada reserva (pendiente, confirmada, cancelada)
- Cancelar una reserva (si está permitido por la política del sistema)
- Editar su perfil: nombre, email, contraseña, etc.

---

## 3. Flujos del Owner / Admin Principal

Este es el dueño del negocio o el administrador general. Puede:

- Iniciar sesión en el panel de administración
- Ver el listado completo de sus cabañas
- Crear una nueva cabaña:
  - Subir fotos
  - Describir características
  - Definir precios por noche
- Editar o eliminar cabañas existentes
- Ver las reservas recibidas por cada cabaña
- Confirmar o rechazar reservas recibidas (opcional)
- Invitar nuevos usuarios al equipo:
  - Como empleados (con permisos limitados)
  - Como administradores secundarios
- Gestionar roles y permisos:
  - Cambiar roles existentes
  - Suspender o eliminar cuentas del equipo
  - Ver estado de invitaciones (pendiente o aceptada)
- (Opcional futuro) Ver estadísticas de uso, reservas, ingresos, etc.

---

## 4. Flujos del Admin Secundario

Tiene permisos intermedios entre el dueño y un empleado. Puede:

- Iniciar sesión en el panel
- Ver, crear y editar cabañas
- Ver y gestionar reservas
- No puede invitar nuevos usuarios ni modificar roles

---

## 5. Flujos del Empleado

Un rol con acceso más restringido. Puede:

- Iniciar sesión en el panel
- Ver las cabañas y sus reservas
- Confirmar o rechazar reservas si tiene ese permiso habilitado
- No puede crear, editar o eliminar cabañas
- No puede invitar usuarios ni ver estadísticas

---

> 💡 **Nota:** Todos estos flujos están sujetos a cambios según cómo evolucione el diseño y las decisiones del negocio.

