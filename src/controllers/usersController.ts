import { RequestHandler } from 'express'; // RequestHandler es un tipo de TypeScript que viene incluido en los tipos de express, y se utiliza para tipar funciones que van a actuar como middlewares o controladores en Express.
import { registerUserUseCase } from '../use-cases/registerUserUseCase';


export const registerUser: RequestHandler = async (req, res) => {
  try {
    const user = await registerUserUseCase(req.body);
    res.status(201).json(user); // sin return
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

 


