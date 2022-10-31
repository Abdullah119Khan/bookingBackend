import express from 'express'
const app = express()
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import hotelRoutes from './routes/hotels.js'
import roomRoutes from './routes/rooms.js'

dotenv.config();


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Mongodb connection success')
    } catch(err) {
        console.log(err)
    }
}

// Middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', hotelRoutes)
app.use('/api', roomRoutes)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something going wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  })
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    connect();
    console.log(`Server Running On PORT ${PORT}`)
})