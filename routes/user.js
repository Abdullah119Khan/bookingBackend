import express from 'express'
import { deleteUser, getAllUser, getUser, updateUser } from '../controllers/user.js';
import { verifyAdmin, verifyUser } from '../util/auth.js';
const router = express.Router()

router.get('/user/getAllUser', getAllUser)
router.get('/user/getUser/:id', verifyUser, getUser)
router.put('/user/update/:id', verifyAdmin, updateUser)
router.delete('/user/delete/:id', verifyAdmin, deleteUser)

export default router;