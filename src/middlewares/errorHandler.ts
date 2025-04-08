import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("💥 Error:", err.message);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    ok: false,
    message: err.message || "Error interno del servidor",
  });
};

export default errorHandler;
