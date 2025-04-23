import { Request, Response } from 'express';

export const logoutUseCase = (req: Request, res: Response) => {
 console.log('Logout ejecutado');

 /*  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  }); */

  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  });

  res.status(200).json({ message: 'Sesión cerrada correctamente' });
};
