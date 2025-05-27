import User from '@domain/User'; // o tu modelo según como lo exportás
import { Types } from 'mongoose';

export const getUserProfileUseCase = async (userId: string) => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new Error('ID de usuario inválido');
  }

  const user = await User.findById(userId).select('-password'); // No devolver la contraseña
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  return {
    id: user._id,
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  };
};
