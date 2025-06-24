import express from 'express';
import { register, login } from '../controllers/authController';
import { validateLogin, validateRegister } from '../middleware/validation';

const router = express.Router();

// Middleware to validate login and register requests
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

export default router;