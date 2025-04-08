# Availability Model (Alternativa para manejar la disponibilidad de cabañas)

Esta es una alternativa para manejar la disponibilidad de cada cabaña mediante una entidad separada, en lugar de calcularla únicamente a partir de las reservas (`Booking`). Es útil si se necesita una gestión más granular de los días disponibles, bloqueos manuales, mantenimiento, etc.

---

## 🧱 Entidad: Availability

- **CabinId** (`ObjectId`) → Referencia a la cabaña.
- **date** (`Date`) → Día individual que representa la disponibilidad.
- **isAvailable** (`boolean`) → Indica si ese día está disponible o no.
- **blockedReason** (`string`, opcional) → Razón del bloqueo (mantenimiento, uso interno, etc.)
- **createdAt / updatedAt** (`Date`) → Timestamps automáticos.

---

## 🧠 ¿Cuándo conviene usar este modelo?

- Si se necesita mostrar un calendario completo con días disponibles y no disponibles.
- Si se quieren bloquear días específicos sin necesidad de crear una reserva.
- Si se necesita registrar diferentes razones de bloqueo (por ejemplo: mantenimiento, uso privado, etc.)

---

## 🧹 Ejemplo de modelo en TypeScript

```ts
import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IAvailability extends Document {
  cabinId: mongoose.Types.ObjectId;
  date: Date;
  isAvailable: boolean;
  blockedReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const availabilitySchema: Schema<IAvailability> = new Schema(
  {
    cabinId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cabin', required: true },
    date: { type: Date, required: true },
    isAvailable: { type: Boolean, default: true },
    blockedReason: { type: String, default: null },
  },
  { timestamps: true }
);

const Availability: Model<IAvailability> = mongoose.model<IAvailability>('Availability', availabilitySchema);

export default Availability;
```

---

## 🔁 Cómo se relaciona con las reservas (`Booking`)

Si decidís usar este modelo:

- Al confirmar una reserva, se deberían **marcar esos días como `isAvailable: false`**.
- Si se cancela una reserva, se pueden **volver a marcar como `isAvailable: true`** (salvo que haya otro motivo de bloqueo).

---

## 📌 Consideraciones

- Agrega complejidad al sistema.
- Puede ser más costoso a nivel de almacenamiento (una entrada por día y por cabaña).
- Es más flexible para negocios que requieren más control sobre la disponibilidad.

---

## ✅ Estado actual

Actualmente **no se está utilizando** esta entidad.  
La disponibilidad se calcula en base a las reservas activas en el sistema.

