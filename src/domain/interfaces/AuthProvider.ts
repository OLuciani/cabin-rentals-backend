export interface AuthProvider {
    signInWithEmailAndPassword(email: string, password: string): Promise<{ firebaseUid: string }>;
  }