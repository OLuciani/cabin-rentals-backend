import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("❌ MONGO_URI no está definida en el archivo .env");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log("✅ Conexión exitosa a MongoDB Atlas");
    console.log(`🔗 Host: ${conn.connection.host}`);
  } catch (error: any) {
    console.error("❌ Error conectando a MongoDB:");
    console.error(`🧠 ${error.message}`);
    process.exit(1); // mata el proceso si falla
  }
};

export default connectDB;

