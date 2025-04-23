import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { DecodedToken } from '../types/decodedToken';
import { RequestHandler } from 'express';


// Extendemos el tipo de Request para incluir el usuario decodificado
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

const authenticateToken: RequestHandler = (req, res, next) => {
  // const token = req.cookies.token || req.headers['authorization']; // ⚠️ Solo para debugging local
  
  const token = req.cookies.token;

  /* if (process.env.NODE_ENV !== 'production') {
    console.log("Token recibido:", token);
  } */
    console.log("Token recibido:", token);


  if (!token) {
    res.status(401).json({ message: "Acceso denegado: token no proporcionado" });
    return; //El return debe ir depués del res.status sino tira error.
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    req.user = decoded;

    if (process.env.NODE_ENV !== 'production') {
      console.log("Usuario autenticado:", req.user);
    }

    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token expirado. Iniciá sesión nuevamente." });
      return;  //El return debe ir depués del res.status sino tira error.
    }

    res.status(400).json({ message: "Token inválido" });
    return;  //El return debe ir depués del res.status sino tira error.
  }
};

export default authenticateToken;
