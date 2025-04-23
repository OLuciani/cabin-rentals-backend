/* import { Request, Response } from 'express';
import User from '@domain/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { CustomError } from 'utils/CustomError';

export default async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  const user = await User.findOne({ email }).select('+passwordHash'); 
  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
  });

  res.status(200).json({
    message: 'Inicio de sesión exitoso',
    user: {
      id: user._id,
      name: user.name,
      role: user.role,
    },
  });
} */


import { Request, Response } from 'express';
import axios from 'axios';
import User from '@domain/User';
import jwt from 'jsonwebtoken';

interface FirebaseSignupResponse {
    localId: string;
    email: string;
    idToken: string;
    refreshToken: string;
    expiresIn: string;
  }

export default async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  try {
    // 🔐 1. Verificar en Firebase Auth
    const firebaseResponse = await axios.post<FirebaseSignupResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_WEB_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    const { localId: firebaseUid } = firebaseResponse.data;

    // 🔎 2. Buscar en MongoDB por el uid de Firebase
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado en la base de datos' });
    }

    // 🎟️ 3. Emitir token o cookie
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    //{expiresIn: '3m'}
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      /* maxAge: 3 * 60 * 1000 // 3 minutos en milisegundos */

    });

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });

  } catch (error: any) {
    console.error('Error en login con Firebase:', error.response?.data || error.message);
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
}
