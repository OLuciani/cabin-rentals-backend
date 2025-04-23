/* export interface DecodedToken {
    id: string;        // definido por vos
    email: string;     // definido por vos
    role: string;      // definido por vos
    iat: number;       // generado por JWT
    exp: number;       // generado por JWT (si usás expiresIn)
    // Otros datos que metas en el token, como email, nombre, etc.
  } */
  
    export interface DecodedToken {
      userId: string;        
      role:string;
    
    }