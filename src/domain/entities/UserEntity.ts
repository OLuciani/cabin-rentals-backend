// Si en un futuro el modelo User cambiara deberia actualizar esta interface
export interface UserEntity {
    id?: string; // opcional, lo asigna la DB
    name: string;
    lastName: string;
    email: string;
    passwordHash: string;
    role: string;
    firebaseUid: string;
  }
  