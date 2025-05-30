import { RequestHandler } from 'express'; // RequestHandler es un tipo de TypeScript que viene incluido en los tipos de express, y se utiliza para tipar funciones que van a actuar como middlewares o controladores en Express.
import { registerUserUseCase } from '../use-cases/users/registerUserUseCase';
import { MongooseUserRepository } from 'infrastructure/repositories/MongooseUserRepository';
import { getUserProfileUseCase } from '../use-cases/users/getUserProfile';


export const registerUser: RequestHandler = async (req, res) => {
  try {
    const user = await registerUserUseCase(req.body, new MongooseUserRepository());
    res.status(201).json(user); // sin return
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const getUserProfile: RequestHandler = async (req, res) => {
  console.log("Solictud entra a getUserProfile")
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Usuario no autenticado' });
      return;  //El return debe ir depués del res.status sino tira error (creo que es por usar RequestHandler).
    }

    const { userId } = req.user; // Ahora TS sabe que req.user existe
    const user = await getUserProfileUseCase(userId);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
 


