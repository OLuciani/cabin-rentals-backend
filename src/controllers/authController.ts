import { Request, Response } from 'express';
import loginUser from '../use-cases/auth/loginUser';
import { logoutUseCase } from '../use-cases/auth/logoutUser';
import { FirebaseAuthProvider} from '../infrastructure/auth/FirebaseAuthProvider';

//const firebaseAuthProvider = new FirebaseAuthProvider();

export const login = async (req: Request, res: Response) => {
  try {
    await loginUser(req, res, new FirebaseAuthProvider());
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


export const logout = (req: Request, res: Response) => {
  logoutUseCase(req, res);
};
