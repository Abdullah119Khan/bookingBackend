import Hotel from '../model/Hotels.js'
import { createError } from '../util/errors.js';
import Room from '../model/Rooms.js'


// Get All Hotel
export const getAllHotel = async (req, res, next) => {
  const { min, max, ...others} = req.query;
  try {
    const allHotel = await Hotel.find({...others, chepeastPrice: { $gt: min | 1, $lt: max || 999}}).limit(req.query.limit)
    return res.status(200).json(allHotel)
  } catch(err) {
    return next(err)
  }
}

// Get Hotel By Id
export const getHotel = async (req, res, next) => {
  try {
    const getHotel = await Hotel.findById(req.params.id)
    return res.status(200).json(getHotel)
  } catch(err) {
    return next(err)
  }
}

// create Hotel
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save()
    return res.status(201).json(savedHotel)
  } catch(err) {
    return next(err)
  }
}

// Update Hotel 
export const updateHotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true })

    return res.status(200).json(updateHotel)
  } catch(err) {
    return next(err)
  }
}

// Delete Hotel
export const deleteHotel = async (req, res, next) => {
  try {
    const deleteHotel = await Hotel.findByIdAndDelete(req.params.id)
    return res.status(200).json('Hotel Deleted Successfully')
  } catch(err) {
    return next(err)
  }
}

// Get Hotel count by city
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',')

  try {
    const list = await Promise.all(cities.map((city) => {
      return Hotel.countDocuments({ city: city })
    }))
    return res.status(200).json(list)
  } catch(err) {
    return next(err)
  }
} 

// Get Hote By Type
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel"})
    const apartmentCount = await Hotel.countDocuments({ type: "apartment"})
    const resortCount = await Hotel.countDocuments({ type: "resort"})
    const villasCount = await Hotel.countDocuments({ type: "villa"})
    const cabinCount = await Hotel.countDocuments({ type: "cabin"})

    return res.status(200).json([
      { type: "hotels", count: hotelCount},
      { type: "apartments", count: apartmentCount},
      { type: "resorts", count: resortCount},
      { type: "villas", count: villasCount},
      { type: "cabins", count: cabinCount}
    ])
  } catch(err) {
    return next(err)
  }
}

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(hotel.rooms.map((room) => {
      return Room.findById(room)
    }))
    return res.status(200).json(list)
  } catch(err) {
    return next(err)
  }
}