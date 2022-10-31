import express from 'express'
import { avialableRoom, createRoom, deleteRoom, getRoom, updateRoom } from '../controllers/rooms.js';
import { verifyAdmin } from '../util/auth.js';
const router = express.Router()

router.get('/room/getRoom', verifyAdmin, getRoom)
router.put('/room/availibility/:id', avialableRoom)
router.post('/room/create/:hotelId', verifyAdmin, createRoom)
router.put('/room/update/:id', verifyAdmin, updateRoom)
router.delete('/room/delete/:id', verifyAdmin, deleteRoom)


export default router;