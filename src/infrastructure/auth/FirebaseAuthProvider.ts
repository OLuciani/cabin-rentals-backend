// Proveedor de autenticación (se lo llama AuthProvider, y es el proveedor de autenticacion en este caso de Firebase).
import axios from 'axios';
import { AuthProvider } from '../../domain/interfaces/AuthProvider';
import { FirebaseSignupResponse } from '../../types/user/auth.types';

export class FirebaseAuthProvider implements AuthProvider {
  async signInWithEmailAndPassword(email: string, password: string): Promise<{ firebaseUid: string }> {
    const response = await axios.post<FirebaseSignupResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_WEB_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    return { firebaseUid: response.data.localId };
  }
}
