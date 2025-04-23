import mongoose from "mongoose";
import dotenv from "dotenv";
import Cabin from "../src/domain/Cabin";
import connectDB from "../src/config/database";

dotenv.config();

connectDB().then(() => {
  console.log("Conexión exitosa a la base de datos");
  seedCabins();
}).catch((err) => {
  console.error("Error de conexión a MongoDB:", err);
});

const seedCabins = async () => {
  try {
    await Cabin.deleteMany({});

    const sampleCabins = [
      {
        name: "Cabaña del Lago",
        description: "Hermosa cabaña frente al lago con vista panorámica.",
        mainImage: "https://res.cloudinary.com/dccuxukqg/image/upload/v1744416980/cabins/caba%C3%B1a-del-lago/qehlgltvdcrhlb9zaol5.webp",
        images: [
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744416982/cabins/caba%C3%B1a-del-lago/ahucquuzpgcczyqukv7p.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744416983/cabins/caba%C3%B1a-del-lago/dnwk8pb1e56sy2uef076.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744416984/cabins/caba%C3%B1a-del-lago/myhyex0z3sahjijscxnp.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744416985/cabins/caba%C3%B1a-del-lago/pch9xbddr7xxgz1elezi.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744416986/cabins/caba%C3%B1a-del-lago/mawmoz54bagmy9elesfc.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744416987/cabins/caba%C3%B1a-del-lago/u1cnmsygif8zyhf7qbn6.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744416988/cabins/caba%C3%B1a-del-lago/b5sdwlrjnjvbxegvgh6a.webp"
        ],
        maxGuests: 6,
        rooms: 3,
        bathrooms: 2,
        pricePerNight: 150,
        isActive: true,
        createdBy: new mongoose.Types.ObjectId(),
        bookedRanges: [],
        amenities: ["WiFi", "Aire acondicionado", "Chimenea"],
        hasGrill: true,
        hasGarage: true,
        location: "Villa La Angostura"
      },
      {
        name: "Refugio en la Montaña",
        description: "Ideal para desconectarse y disfrutar de la naturaleza.",
        mainImage: "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417031/cabins/refugio-en-la-monta%C3%B1a/bex6wh9zh9cmhavcbqu6.webp",
        images: [
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417032/cabins/refugio-en-la-monta%C3%B1a/k8xbe34d9srtrrqdogtq.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417033/cabins/refugio-en-la-monta%C3%B1a/c6wjgkcekb25cl7hjl9x.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417034/cabins/refugio-en-la-monta%C3%B1a/eqizr9oydnqko3sbhm7y.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417035/cabins/refugio-en-la-monta%C3%B1a/udcdkpwhwjx9okpblz1l.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417036/cabins/refugio-en-la-monta%C3%B1a/pj7fc8sx98jn0bcb5dbg.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417038/cabins/refugio-en-la-monta%C3%B1a/hi3ff8lzv9glqi4xo8a7.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417039/cabins/refugio-en-la-monta%C3%B1a/xpdlf5eullwls8xbrtxw.webp"
        ],
        maxGuests: 4,
        rooms: 2,
        bathrooms: 1,
        pricePerNight: 100,
        isActive: true,
        createdBy: new mongoose.Types.ObjectId(),
        bookedRanges: [],
        amenities: ["Estufa a leña", "Senderismo", "Cocina equipada"],
        hasGrill: false,
        hasGarage: false,
        location: "San Martín de los Andes"
      },
      {
        name: "Cabaña del Bosque",
        description: "Rodeada de árboles y paz absoluta.",
        mainImage: "https://res.cloudinary.com/dccuxukqg/image/upload/v1744416972/cabins/caba%C3%B1a-del-bosque/f4isnvpjyygxqosqn3d2.webp",
        images: [
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744416973/cabins/caba%C3%B1a-del-bosque/nhbsgvftcfiqyttl8kv5.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744416974/cabins/caba%C3%B1a-del-bosque/v0srokglqm5kfgsdtjed.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744416975/cabins/caba%C3%B1a-del-bosque/xqjh0mfj9aureigcxvfd.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744416976/cabins/caba%C3%B1a-del-bosque/yz75hzugxr8obbkie2pg.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744416977/cabins/caba%C3%B1a-del-bosque/tfjn74lmsil27mgmomfa.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744416978/cabins/caba%C3%B1a-del-bosque/uofeul4lnuui77jhzba2.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744416979/cabins/caba%C3%B1a-del-bosque/h69jr7dxvqgwtm6qql50.webp"
        ],
        maxGuests: 5,
        rooms: 2,
        bathrooms: 1,
        pricePerNight: 120,
        isActive: true,
        createdBy: new mongoose.Types.ObjectId(),
        bookedRanges: [],
        amenities: ["Parrilla", "Hamaca paraguaya"],
        hasGrill: true,
        hasGarage: false,
        location: "El Bolsón"
      },
      {
        name: "Cabaña Moderna",
        description: "Diseño moderno y minimalista, cerca del centro.",
        mainImage: "https://res.cloudinary.com/dccuxukqg/image/upload/v1744416989/cabins/caba%C3%B1a-moderna/ynwak68ug2uw31sdtafb.webp",
        images: [
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744416990/cabins/caba%C3%B1a-moderna/ppgitwwfubrpsrdeldgh.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744416991/cabins/caba%C3%B1a-moderna/utqlsxn5kmwvwvazoavu.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744416992/cabins/caba%C3%B1a-moderna/usetsblculcsjkvorguo.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744416993/cabins/caba%C3%B1a-moderna/ekukxqyjvyseizbjvlcv.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744416994/cabins/caba%C3%B1a-moderna/dixggwnr33gg1odbs5dq.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744416995/cabins/caba%C3%B1a-moderna/u37gxrqp7wljyrcqhsuz.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744416996/cabins/caba%C3%B1a-moderna/clw3nmrjjath9rewabte.webp"
        ],
        maxGuests: 3,
        rooms: 1,
        bathrooms: 1,
        pricePerNight: 180,
        isActive: true,
        createdBy: new mongoose.Types.ObjectId(),
        bookedRanges: [],
        amenities: ["Smart TV", "WiFi", "Jacuzzi"],
        hasGrill: false,
        hasGarage: true,
        location: "Bariloche"
      },
      {
        name: "La Tranquila",
        description: "Ideal para familias, con gran espacio verde.",
        mainImage: "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417004/cabins/la-tranquila/la-tranquila-1.webp",
        images: [
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417006/cabins/la-tranquila/la-tranquila-2.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417008/cabins/la-tranquila/la-tranquila-3.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417009/cabins/la-tranquila/la-tranquila-4.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417009/cabins/la-tranquila/la-tranquila-5.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417010/cabins/la-tranquila/la-tranquila-6.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417012/cabins/la-tranquila/la-tranquila-7.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417013/cabins/la-tranquila/la-tranquila-8.webp"
        ],
        maxGuests: 8,
        rooms: 4,
        bathrooms: 2,
        pricePerNight: 200,
        isActive: true,
        createdBy: new mongoose.Types.ObjectId(),
        bookedRanges: [],
        amenities: ["Parque", "Juegos para niños", "WiFi"],
        hasGrill: true,
        hasGarage: true,
        location: "Villa General Belgrano"
      },
      {
        name: "Nido de Cóndores",
        description: "Vistas impresionantes y contacto puro con la naturaleza.",
        mainImage: "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417023/cabins/nido-de-c%C3%B3ndores/qb7x8ice157abybfkkc5.webp",
        images: [
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417024/cabins/nido-de-c%C3%B3ndores/fysvhc3dnbwccndisb7s.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417025/cabins/nido-de-c%C3%B3ndores/yjqd9stp0owaxstd7ydj.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417026/cabins/nido-de-c%C3%B3ndores/ssvuis8ef0ckfwbcmmri.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417027/cabins/nido-de-c%C3%B3ndores/erlgtx9zphcw5niedjz0.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417028/cabins/nido-de-c%C3%B3ndores/czvwdyipm7fv5nawehw7.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417029/cabins/nido-de-c%C3%B3ndores/flqstsgoomhfchxcawa8.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417030/cabins/nido-de-c%C3%B3ndores/fqrjicqmmq0promfuzjc.webp"
        ],
        maxGuests: 2,
        rooms: 1,
        bathrooms: 1,
        pricePerNight: 90,
        isActive: true,
        createdBy: new mongoose.Types.ObjectId(),
        bookedRanges: [],
        amenities: ["Balcón", "Vista a la montaña"],
        hasGrill: false,
        hasGarage: false,
        location: "Mendoza"
      },
      {
        name: "Casa de Piedra",
        description: "Construida completamente en piedra, rústica y acogedora.",
        mainImage: "https://res.cloudinary.com/dccuxukqg/image/upload/v1744416997/cabins/casa-de-piedra/casa-de-piedra-1.webp",
        images: [
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744416998/cabins/casa-de-piedra/casa-de-piedra-2.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744416999/cabins/casa-de-piedra/casa-de-piedra-3.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417000/cabins/casa-de-piedra/casa-de-piedra-4.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417001/cabins/casa-de-piedra/casa-de-piedra-5.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417002/cabins/casa-de-piedra/casa-de-piedra-6.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417002/cabins/casa-de-piedra/casa-de-piedra-7.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417003/cabins/casa-de-piedra/casa-de-piedra-8.webp"
        ],
        maxGuests: 6,
        rooms: 3,
        bathrooms: 2,
        pricePerNight: 140,
        isActive: true,
        createdBy: new mongoose.Types.ObjectId(),
        bookedRanges: [],
        amenities: ["Chimenea", "Cocina completa"],
        hasGrill: true,
        hasGarage: true,
        location: "Potrerillos"
      },
      {
        name: "Mirador del Cielo",
        description: "Ubicada en lo alto de la montaña, perfecta para ver las estrellas.",
        mainImage: "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417014/cabins/mirador-del-cielo/mirador-del-cielo-1.webp",
        images: [
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417015/cabins/mirador-del-cielo/mirador-del-cielo-2.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417016/cabins/mirador-del-cielo/mirador-del-cielo-3.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417017/cabins/mirador-del-cielo/mirador-del-cielo-4.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417018/cabins/mirador-del-cielo/mirador-del-cielo-5.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417019/cabins/mirador-del-cielo/mirador-del-cielo-6.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417021/cabins/mirador-del-cielo/mirador-del-cielo-7.webp",
          "https://res.cloudinary.com/dccuxukqg/image/upload/v1744417022/cabins/mirador-del-cielo/mirador-del-cielo-8.webp"
        ],
        maxGuests: 4,
        rooms: 2,
        bathrooms: 1,
        pricePerNight: 110,
        isActive: true,
        createdBy: new mongoose.Types.ObjectId(),
        bookedRanges: [],
        amenities: ["Terraza", "Estufa a gas", "Vista panorámica"],
        hasGrill: true,
        hasGarage: false,
        location: "Cerro Chapelco"
      }
    ];

    await Cabin.insertMany(sampleCabins);
    console.log("✅ Cabañas insertadas correctamente.");
    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error al insertar cabañas:", error);
    mongoose.disconnect();
  }
};

