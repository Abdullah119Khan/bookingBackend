import express from 'express'
import { login, register } from '../controllers/auth.js';
const router = express.Router()

router.post('/auth/login', login)
router.post('/auth/create', register)

export default router;