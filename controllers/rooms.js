import Hotels from '../model/Hotels.js'
import Room from '../model/Rooms.js'

// Get Room
export const getRoom = async (req, res, next) => {
  try {
    const getRoom = await Room.find()
    return res.status(200).json(getRoom)
  } catch(err) {
    return next(err)
  }
}

// Create Room
export const createRoom  = async (req, res, next) => {
  const hotelId = req.params.hotelId
  const newRoom = new Room(req.body)

  try {
    const savedRoom = await newRoom.save()

    try {
      await Hotels.findByIdAndUpdate(hotelId, { 
        $push: { rooms: savedRoom._id }
      });
    } catch(err) {
      return next(err)
    }
    return res.status(200).json(savedRoom)
  } catch(err) {
    return next(err)
  }
}

// Upate Room
export const updateRoom = async (req, res, next) => {
  try {
    const updateRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    return res.status(200).json(updateRoom)
  } catch(err) {
    return next(err)
  }
}

// Update One 
export const avialableRoom = async (req, res, next) => {
  try {
    await Room.updateOne({"roomsNumbers._id" : req.params.id}, {
      $push: {
        "roomsNumbers.$.unavailableDates": req.body.dates
      }
    })
    return res.status(200).json('Room Updated')
  } catch(err) {
    return next(err)
  }
}

// Delete Room 
export const deleteRoom = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.id)
    return res.status(200).json('Room deleted success')
  } catch(err) {
    return next(err)
  }
}