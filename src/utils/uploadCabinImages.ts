/**
 * Script para subir imágenes de cabañas a Cloudinary.
 *
 * Este script recorre todas las carpetas dentro del directorio /images, 
 * sube cada imagen .webp a Cloudinary en una carpeta correspondiente, 
 * y guarda las URLs generadas en un archivo llamado cloudinaryImageUrls.json que gejera automáticamente.
 * 
 * Este archivo JSON puede luego ser usado para importar las URLs en el seed de la base de datos.
 *
 * Asegurarse de tener configuradas las variables de entorno de Cloudinary antes de ejecutar este script:
 * - CLOUDINARY_CLOUD_NAME
 * - CLOUDINARY_API_KEY
 * - CLOUDINARY_API_SECRET
 *
 * Ejecutar con: `ts-node src/utils/uploadCabinImages.ts`
 */

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const baseFolder = path.join(process.cwd(), "images");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const uploadImages = async () => {
  const cabinFolders = fs.readdirSync(baseFolder).filter((folder) => {
    return fs.statSync(path.join(baseFolder, folder)).isDirectory();
  });

  const result: Record<string, string[]> = {};

  for (const folder of cabinFolders) {
    const cabinPath = path.join(baseFolder, folder);
    const imageFiles = fs.readdirSync(cabinPath).filter((file) =>
      file.match(/\.(webp)$/)
    );

    result[folder] = [];

    for (const imageFile of imageFiles) {
      const filePath = path.join(cabinPath, imageFile);
      
      try {
        const uploadResult = await cloudinary.uploader.upload(filePath, {
          folder: `cabins/${folder}`,
          use_filename: true,
          unique_filename: false,
          overwrite: true,
        });
        console.log(`✅ Subida: ${uploadResult.url}`);
        result[folder].push(uploadResult.secure_url);
      } catch (error) {
        console.error(`❌ Error al subir la imagen ${imageFile}:`, error);
      }
    }
  }

  try {
    fs.writeFileSync(
      path.join(__dirname, "cloudinaryImageUrls.json"),
      JSON.stringify(result, null, 2),
      "utf-8"
    );
    console.log("🎉 Todas las imágenes fueron subidas y las URLs guardadas.");
  } catch (error) {
    console.error("❌ Error al guardar el archivo JSON:", error);
  }
};

uploadImages().catch((error) => {
  console.error("Error no manejado:", error);
});
