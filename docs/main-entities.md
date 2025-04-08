# Entidades principales de la aplicación

Este documento describe las entidades centrales del sistema de alquiler de cabañas, junto con sus propiedades clave y una breve descripción funcional.

---

## 🏠 Entidad: `Cabin`

Representa una cabaña que puede ser alquilada.

**Propiedades:**

- `id`: Identificador único de la cabaña.
- `name`: Nombre de la cabaña.
- `description`: Descripción general de la cabaña.
- `location`: Ubicación geográfica (puede incluir ciudad, provincia, coordenadas, etc.).
- `pricePerNight`: Precio por noche.
- `capacity`: Cantidad máxima de huéspedes que puede alojar.
- `amenities`: Lista de comodidades (ej. wifi, parrilla, pileta).
- `images`: URLs de las imágenes asociadas.
- `ownerId`: ID del dueño o administrador de la cabaña.
- `availability`: Lista de rangos de fechas en las que la cabaña está disponible o reservada.
- `createdAt`: Fecha de creación.
- `updatedAt`: Última fecha de modificación.

---

## 👤 Entidad: `User`

Representa a un usuario del sistema, ya sea visitante, cliente, dueño o personal autorizado.

**Propiedades:**

- `id`: Identificador único del usuario.
- `fullName`: Nombre completo.
- `email`: Correo electrónico.
- `password`: Contraseña (hasheada).
- `role`: Rol del usuario (`admin`, `owner`, `employee`, `customer`).
- `createdAt`: Fecha de registro.
- `updatedAt`: Última fecha de modificación.

---

## 📅 Entidad: `Reservation`

Representa una reserva realizada por un cliente para una cabaña en fechas determinadas.

**Propiedades:**

- `id`: Identificador único de la reserva.
- `cabinId`: ID de la cabaña reservada.
- `userId`: ID del usuario que hizo la reserva.
- `startDate`: Fecha de inicio de la estadía.
- `endDate`: Fecha de fin de la estadía.
- `totalPrice`: Precio total de la reserva.
- `status`: Estado de la reserva (`pending`, `confirmed`, `cancelled`, `completed`).
- `createdAt`: Fecha en que se creó la reserva.

---

## 🛠️ Entidad: `Employee`

Empleado asignado por un `owner` para colaborar en la gestión de cabañas.

**Propiedades:**

- `id`: Identificador único del empleado.
- `ownerId`: ID del dueño que lo invitó o creó.
- `fullName`: Nombre completo.
- `email`: Correo electrónico.
- `permissions`: Permisos asignados (por ejemplo: ver reservas, editar cabañas, etc.).
- `createdAt`: Fecha de creación.

---

## 💬 Entidad: `Message` (opcional)

Para futuras funcionalidades de contacto o mensajes entre cliente y propietario.

**Propiedades:**

- `id`: Identificador del mensaje.
- `senderId`: ID del remitente.
- `receiverId`: ID del receptor.
- `content`: Contenido del mensaje.
- `sentAt`: Fecha de envío.

---

> ✏️ Este archivo puede ampliarse a medida que se agreguen nuevas funcionalidades al sistema, como pagos, reseñas o reportes.

