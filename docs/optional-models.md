# Modelos opcionales para futuras funcionalidades

Este archivo documenta modelos que **no serán implementados inicialmente**, pero que podrían añadirse en el futuro si el proyecto lo requiere.

---

## 1. `Message`
Modelo para manejar mensajes entre usuarios, por ejemplo entre un cliente y un administrador o asistente.

```ts
sender: User
receiver: User
message: string
sentAt: Date
```

---

## 2. `Notification`
Modelo para notificaciones internas al usuario, como cambios en reservas, nuevas reseñas, respuestas, etc.

```ts
user: User
type: 'booking_created' | 'booking_cancelled' | 'review_received' | ...
content: string
read: boolean
createdAt: Date
```

---

## 3. `CabinImage`
Permite administrar múltiples imágenes por cabaña con más control que una simple lista de URLs.

```ts
cabin: Cabin
url: string
isCover: boolean
uploadedAt: Date
```

---

## 4. `AuditLog`
Modelo para auditar acciones realizadas por el equipo administrativo en el sistema.

```ts
action: string
performedBy: User
targetModel: string
targetId: ObjectId
timestamp: Date
```

---

## 5. `Discount`
Modelo para representar descuentos especiales aplicados a cabañas durante ciertas fechas.

```ts
cabin: Cabin
percentage: number
startDate: Date
endDate: Date
```

---

## 6. `Client`
Modelo para representar a los clientes registrados (alternativa a usar `User` directamente si se necesita separación de responsabilidades o datos).

```ts
name: string
email: string
phone?: string
createdAt: Date
```

---

## 7. `Payment`
Modelo para registrar pagos realizados por los clientes (especialmente útil si se integran pasarelas de pago en el futuro).

```ts
booking: Booking
amount: number
status: 'pending' | 'completed' | 'failed'
method: 'credit_card' | 'paypal' | 'cash' | ...
paidAt?: Date
```
---

## Sobre `Availability`
El modelo `Availability` (disponibilidad separada por fechas) fue documentado por separado en el archivo [`availability.md`](./availability.md), ya que implica una estructura y lógica distintas a los modelos opcionales listados aquí.

---

## Consideraciones
- Estos modelos pueden ayudar a escalar la plataforma y mejorar la experiencia del usuario.
- Pueden añadirse fácilmente respetando la estructura modular y la Clean Architecture adoptada en el proyecto.
- No requieren modificaciones en los modelos actuales para ser integrados en el futuro.

---

> Documentado para futuras referencias – versión inicial del proyecto.


