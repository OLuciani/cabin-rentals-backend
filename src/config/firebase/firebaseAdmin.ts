// Configuacion para proyecto en firebase: cabin-rental
/* import admin from "firebase-admin";

// Validamos que todas las variables necesarias estén presentes
if (!process.env.FIREBASE_PROJECT_ID) {
  throw new Error("FIREBASE_PROJECT_ID is not defined in environment variables.");
}

if (!process.env.FIREBASE_CLIENT_EMAIL) {
  throw new Error("FIREBASE_CLIENT_EMAIL is not defined in environment variables.");
}

if (!process.env.FIREBASE_PRIVATE_KEY) {
  throw new Error("FIREBASE_PRIVATE_KEY is not defined in environment variables.");
}

// Inicializamos la app de Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

export default admin; */



// Configuacion nueva para proyecto en firebase: cabin-rentals
import admin from "firebase-admin";

// Validamos que todas las variables necesarias estén presentes
if (!process.env.FIREBASE_PROJECT_ID) {
  throw new Error("FIREBASE_PROJECT_ID is not defined in environment variables.");
}

if (!process.env.FIREBASE_CLIENT_EMAIL) {
  throw new Error("FIREBASE_CLIENT_EMAIL is not defined in environment variables.");
}

if (!process.env.FIREBASE_PRIVATE_KEY) {
  throw new Error("FIREBASE_PRIVATE_KEY is not defined in environment variables.");
}

// Inicializamos la app de Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

export default admin;

