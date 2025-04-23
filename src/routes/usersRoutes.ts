// Define las rutas relacionadas con usuarios

/* import express from 'express';
import registerUser from '../controllers/usersController';

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

export default router; */

/* import { Router } from 'express';
import { registerUser } from '../controllers/usersController';

const router = Router();

router.post('/register', registerUser);

export default router; */



import { Router } from 'express';
import { registerUser, getUserProfile } from '../controllers/usersController';
import authenticateToken from '../middlewares/authenticateToken';


const router = Router();

router.post('/register', registerUser);
router.get('/user-profile', authenticateToken, getUserProfile); // ✅ perfil protegido por token

export default router;