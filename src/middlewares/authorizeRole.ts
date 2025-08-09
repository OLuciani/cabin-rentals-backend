/* import { Request, Response, NextFunction } from 'express';
import { DecodedToken } from '../types/decodedToken';

const authorizeRole = (allowedRoles: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as DecodedToken;

      if (!user) {
        return res.status(401).json({ message: "Se requiere autenticación." });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: "Acceso denegado, no cuentas con los permisos necesarios." });
      }

      if (process.env.NODE_ENV !== 'production') {
        console.log("Rol recuperado con req.user.role:", user.role);
      }

      next();

    } catch (error) {
      console.error("Error en authorizeRole middleware:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };
};

export default authorizeRole; */



import { RequestHandler } from 'express';

const authorizeRole = (allowedRoles: string[] = []): RequestHandler => {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        res.status(401).json({ message: "Se requiere autenticación." });
        return;
      }

      if (!allowedRoles.includes(user.role)) {
        res.status(403).json({ message: "Acceso denegado, no cuentas con los permisos necesarios." });
        return;
      }

      if (process.env.NODE_ENV !== 'production') {
        console.log("Rol recuperado con req.user.role:", user.role);
      }

      next();

    } catch (error) {
      console.error("Error en authorizeRole middleware:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };
};

export default authorizeRole;
