import { Router } from 'express';
import { registerUser, getUserProfile } from '../controllers/usersController';
import authenticateToken from '../middlewares/authenticateToken';


const router = Router();

router.post('/register', registerUser);
router.get('/user-profile', authenticateToken, getUserProfile); // ✅ perfil protegido por token

export default router;