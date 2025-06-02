//Codigo nuevo con proveedor de autenticacion de Firebase
// src/use-cases/auth/loginUser.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../domain/User';
import { FirebaseAuthProvider } from '../../infrastructure/auth/FirebaseAuthProvider';

export default async function loginUser(req: Request, res: Response, authProvider: FirebaseAuthProvider ) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  //const authProvider = new FirebaseAuthProvider();

  try {
    const { firebaseUid } = await authProvider.signInWithEmailAndPassword(email, password);

    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado en la base de datos' });
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
      maxAge: 7 * 24 * 60 * 60 * 1000,
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
    console.error('Error al iniciar sesión:', error.response?.data || error.message);
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
}
