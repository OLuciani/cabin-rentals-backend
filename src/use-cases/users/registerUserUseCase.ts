// Lógica del caso de uso: registrar un nuevo usuario

/* import User from '../domain/User';
import bcrypt from 'bcryptjs';
import { getAuth } from 'firebase-admin/auth';

interface RegisterData {
  name: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
}

export const registerUserUseCase = async (data: RegisterData) => {
  const { name, lastName, email, password, role } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Ya existe un usuario con ese email');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    lastName,
    email,
    passwordHash,
    role,
  });

  await newUser.save();

  try {
    // Crear el usuario en Firebase Auth
    await getAuth().createUser({
      email,
      password,
      displayName: `${name} ${lastName}`,
    });
  } catch (error) {
    // Si falla Firebase, eliminar el usuario recién creado en MongoDB
    await User.findByIdAndDelete(newUser._id);
    console.error('Error al crear el usuario en Firebase:', error);
    throw new Error('Ocurrió un error al registrar el usuario');
  }

  return {
    message: 'Usuario registrado correctamente',
    user: {
      id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      lastName: newUser.lastName,
      role: newUser.role,
    },
  };
}; */
    


// Lógica del caso de uso: registrar un nuevo usuario

import User from '../../domain/User';
import bcrypt from 'bcryptjs';
import { getAuth } from 'firebase-admin/auth';

interface RegisterData {
  name: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
}

export const registerUserUseCase = async (data: RegisterData) => {
  const { name, lastName, email, password, role } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Ya existe un usuario con ese email');
  }

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

  const newUser = new User({
    name,
    lastName,
    email,
    passwordHash,
    role,
    firebaseUid: firebaseUserId,
  });

  try {
    await newUser.save();
  } catch (error) {
    // Si falla guardar en MongoDB, eliminar el usuario en Firebase
    await getAuth().deleteUser(firebaseUserId);
    console.error('Error al guardar usuario en MongoDB:', error);
    throw new Error('Error al guardar usuario en la base de datos');
  }

  return {
    message: 'Usuario registrado correctamente',
    user: {
      id: newUser._id,
      firebaseUid: newUser.firebaseUid,
      email: newUser.email,
      name: newUser.name,
      lastName: newUser.lastName,
      role: newUser.role,
    },
  };
};
