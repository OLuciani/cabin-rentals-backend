// Importaciones necesarias desde Mongoose
import mongoose, { Document, Schema, Model } from 'mongoose';

// Definimos un tipo para los roles de usuario permitidos
export type UserRole = 'admin' | 'assistant' | 'employee' | 'client';

// Interfaz que representa la estructura del documento de un usuario en la base de datos
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;        // ID único del usuario (generado automáticamente)
  email: string;                        // Correo electrónico del usuario (único)
  passwordHash: string;                // Contraseña en formato hash
  name: string;                        // Apellido del usuario
  lastName: string                       // Nombre del usuario
  role: UserRole;                      // Rol del usuario (admin, assistant, etc.)
  invitedBy?: mongoose.Types.ObjectId | null; // Referencia opcional al usuario que lo invitó
  createdAt: Date;                     // Fecha de creación (automática)
  updatedAt: Date;                     // Fecha de última actualización (automática)
  firebaseUid: string;    
  phone: string;             // Identificador único del usuario en Firebase, utilizado para autenticación
}

// Creamos el esquema de Mongoose para definir cómo se guardan los usuarios en MongoDB
const userSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // No se permiten dos usuarios con el mismo email
    },
    passwordHash: {
      type: String,
      required: true, // Este campo es obligatorio
    },
    name: {
      type: String,
      required: true, // Nombre obligatorio
    },
    lastName: {
        type: String,
        required: true, // Apellido obligatorio
      },
    phone: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['generalAdmin', 'admin', 'limitedAdmin', 'employee', 'client'], // Solo se permiten estos valores
      default: 'client', // Por defecto, el usuario tiene el rol "client"
    },
    invitedBy: {
      type: mongoose.Schema.Types.ObjectId, // ID de otro usuario
      ref: 'User', // Referencia a otro documento del modelo User
      default: null,
    },
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
    },
    
  },
  {
    timestamps: true, // Agrega automáticamente createdAt y updatedAt
  }
);

// Creamos el modelo de Mongoose a partir del esquema
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

// Exportamos el modelo para poder usarlo en otras partes del backend
export default User;

