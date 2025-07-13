/* import { Request, Response, NextFunction } from "express";
import multer from "multer";
import sharp from "sharp";
import cloudinary from "../utils/cloudinary";
import { Readable } from "stream";

// Configurar multer para almacenar imágenes en memoria
const storage = multer.memoryStorage();
export const upload = multer({ storage }).fields([
  { name: "mainImage", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

// Función auxiliar para subir imagen desde un buffer a Cloudinary
const uploadToCloudinary = (buffer: Buffer, filename: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "cabins",
        public_id: filename,
        format: "webp",
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      }
    );

    Readable.from(buffer).pipe(stream);
  });
};

// Middleware que procesa y sube las imágenes
export const processCabinImages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.files) return next();

    const files = req.files as {
      mainImage?: Express.Multer.File[];
      images?: Express.Multer.File[];
    };

    // Imagen principal
    if (files.mainImage?.[0]) {
      const buffer = await sharp(files.mainImage[0].buffer)
        .resize(1000, 667)
        .webp({ quality: 80 })
        .toBuffer();

      const url = await uploadToCloudinary(buffer, `main-${Date.now()}`);
      req.body.mainImage = url;
    }

    // Otras imágenes
    if (files.images && files.images.length > 0) {
      const urls: string[] = [];

      for (const [i, file] of files.images.entries()) {
        const buffer = await sharp(file.buffer)
          .resize(1000, 667)
          .webp({ quality: 80 })
          .toBuffer();

        const url = await uploadToCloudinary(buffer, `img-${Date.now()}-${i}`);
        urls.push(url);
      }

      req.body.images = urls;
    }

    next();
  } catch (error) {
    console.error("❌ Error al procesar imágenes:", error);
    res.status(500).json({ error: "Error al procesar imágenes" });
  }
}; */



// este funciona bien pero no funciona cuando se edita una cabna y se cambian imagenes
/* import { Request, Response, NextFunction } from "express";
import multer from "multer";
import sharp from "sharp";
import cloudinary from "../utils/cloudinary";
import { Readable } from "stream";

// Configurar multer para almacenar imágenes en memoria
const storage = multer.memoryStorage();
export const upload = multer({ storage }).fields([
  { name: "mainImage", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

// Función auxiliar para subir imagen desde un buffer a Cloudinary
const uploadToCloudinary = (
  buffer: Buffer,
  filename: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "cabins",
        public_id: filename,
        format: "webp",
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      }
    );

    Readable.from(buffer).pipe(stream);
  });
};

// Middleware que procesa y sube las imágenes
export const processCabinImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files) return next();

    const files = req.files as {
      mainImage?: Express.Multer.File[];
      images?: Express.Multer.File[];
    };

    // Imagen principal
    if (files.mainImage?.[0]) {
      const buffer = await sharp(files.mainImage[0].buffer)
        .resize(1000, 667)
        .webp({ quality: 80 })
        .toBuffer();

      const url = await uploadToCloudinary(buffer, `main-${Date.now()}`);
      req.body.mainImage = url;
    }

    // Imágenes secundarias
    if (files.images && files.images.length > 0) {
      const secondaryImageUrls: string[] = [];

      for (const [i, file] of files.images.entries()) {
        const buffer = await sharp(file.buffer)
          .resize(1000, 667)
          .webp({ quality: 80 })
          .toBuffer();

        const url = await uploadToCloudinary(
          buffer,
          `imagenSecundaria-${i + 1}-${Date.now()}`
        );
        secondaryImageUrls.push(url); //
      }

      req.body.images = secondaryImageUrls; // 
    }

    next();
  } catch (error) {
    console.error("❌ Error al procesar imágenes:", error);
    res.status(500).json({ error: "Error al procesar imágenes" });
  }
};
 */



import { Request, Response, NextFunction } from "express";
import multer from "multer";
import sharp from "sharp";
import cloudinary from "../utils/cloudinary";
import { Readable } from "stream";

// Configurar multer para almacenar imágenes en memoria
const storage = multer.memoryStorage();
export const upload = multer({ storage }).fields([
  { name: "mainImage", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

// Función auxiliar para subir imagen desde un buffer a Cloudinary
const uploadToCloudinary = (
  buffer: Buffer,
  filename: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "cabins",
        public_id: filename,
        format: "webp",
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      }
    );

    Readable.from(buffer).pipe(stream);
  });
};

// Middleware que procesa y sube las imágenes
export const processCabinImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files) return next();

    const files = req.files as {
      mainImage?: Express.Multer.File[];
      images?: Express.Multer.File[];
    };

    // Procesar imagen principal (si se envió una nueva)
    if (files.mainImage?.[0]) {
      const buffer = await sharp(files.mainImage[0].buffer)
        .resize(1000, 667)
        .webp({ quality: 80 })
        .toBuffer();

      const url = await uploadToCloudinary(buffer, `main-${Date.now()}`);
      req.body.mainImage = url;
    }

    // Procesar imágenes secundarias nuevas (tipo File)
    const newSecondaryImageUrls: string[] = [];

    if (files.images && files.images.length > 0) {
      for (const [i, file] of files.images.entries()) {
        const buffer = await sharp(file.buffer)
          .resize(1000, 667)
          .webp({ quality: 80 })
          .toBuffer();

        const url = await uploadToCloudinary(
          buffer,
          `imagenSecundaria-${i + 1}-${Date.now()}`
        );
        newSecondaryImageUrls.push(url);
      }
    }

    // Recuperar imágenes existentes (tipo string) desde req.body.images
    let existingImageUrls: string[] = [];

    if (req.body.images) {
      if (typeof req.body.images === "string") {
        existingImageUrls = [req.body.images];
      } else if (Array.isArray(req.body.images)) {
        existingImageUrls = req.body.images.filter((img: unknown): img is string =>
          typeof img === "string"
        );
      }
    }

    // Combinar imágenes existentes con nuevas (manteniendo orden)
    req.body.images = [...existingImageUrls, ...newSecondaryImageUrls];

    next();
  } catch (error) {
    console.error("❌ Error al procesar imágenes:", error);
    res.status(500).json({ error: "Error al procesar imágenes" });
  }
};
