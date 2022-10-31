import express from 'express'
import { countByCity, countByType, createHotel, deleteHotel, getAllHotel, getHotel, updateHotel, getHotelRooms } from '../controllers/hotels.js';
import { verifyAdmin } from '../util/auth.js';
const router = express.Router()


router.get('/hotel/getAllHotel', getAllHotel)
router.get('/hotel/getHotel/:id', getHotel)
router.post('/hotel/create', verifyAdmin, createHotel)
router.put('/hotel/update/:id', verifyAdmin, updateHotel)
router.delete('/hotel/delete/:id', verifyAdmin, deleteHotel)

router.get('/hotel/countByCity', countByCity)
router.get('/hotel/countByType', countByType)
router.get('/hotel/room/:id', getHotelRooms)

export default router;