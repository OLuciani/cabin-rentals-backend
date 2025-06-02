import bcrypt from 'bcryptjs';
import { getAuth } from 'firebase-admin/auth';
import { RegisterData } from '../../types/user/user.types';
import { UserRepository } from '../../domain/interfaces/UserRepository';
import { UserEntity } from '../../domain/entities/UserEntity';

export const registerUserUseCase = async (
  data: RegisterData, // recibe los argumentos de req.body del controller
  userRepository: UserRepository // 👈 el repositorio se inyecta aquí y usa la interface (como si fuera un tipo de repositorio)
) => {
  const { name, lastName, email, password, role } = data;

  // Verificar si ya existe un usuario con ese email
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error('Ya existe un usuario con ese email');
  }

  // Encriptar la contraseña
  const passwordHash = await bcrypt.hash(password, 10);

  let firebaseUserId: string;

  try {
    // Crear el usuario en Firebase Auth
    const firebaseUser = await getAuth().createUser({
      email,
      password,
      displayName: `${name} ${lastName}`,
    });

    firebaseUserId = firebaseUser.uid;
  } catch (error) {
    console.error('Error al crear el usuario en Firebase:', error);
    throw new Error('Ocurrió un error al registrar el usuario');
  }

  // Crear entidad del usuario para guardarlo en Mongo
  const newUser: UserEntity = {
    name,
    lastName,
    email,
    passwordHash,
    role: role ?? 'client', // Si no viene, usa 'client'
    firebaseUid: firebaseUserId,
  };

  let savedUser: UserEntity;

  try {
    savedUser = await userRepository.save(newUser);
  } catch (error) {
    // Si falla guardar en MongoDB, eliminar el usuario en Firebase
    await getAuth().deleteUser(firebaseUserId);
    console.error('Error al guardar usuario en la base de datos:', error);
    throw new Error('Error al guardar usuario en la base de datos');
  }

  return {
    message: 'Usuario registrado correctamente',
    user: {
      id: savedUser.id,
      firebaseUid: savedUser.firebaseUid,
      email: savedUser.email,
      name: savedUser.name,
      lastName: savedUser.lastName,
      role: savedUser.role,
    },
  };
};
