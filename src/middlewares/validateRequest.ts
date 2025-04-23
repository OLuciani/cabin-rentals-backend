import { validationResult, Result, ValidationError } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map((err) => {
      // Verificamos si tiene la propiedad 'param'
      if ('param' in err) {
        return {
          field: err.param,
          message: err.msg,
        };
      } else {
        // Por si no tiene 'param' (caso raro), devolvemos mensaje general
        return {
          field: 'unknown',
          message: err.msg,
        };
      }
    });

    return res.status(400).json({ errors: extractedErrors });
  }

  next();
};
