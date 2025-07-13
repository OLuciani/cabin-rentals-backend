import { RequestHandler } from "express";

export const injectCreatedBy: RequestHandler = (req, res, next) => {
  if (!req.user) {
    // Llamamos a next con un error para que lo maneje un middleware de errores
    return next(new Error("Usuario no autenticado"));
  }

  req.body.createdBy = req.user.userId;
  next();
};


