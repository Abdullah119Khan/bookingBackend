import User from '../model/User.js'

// Get All User
export const getAllUser = async (req, res, next) => {
  try {
    const getUser = await User.find()
    return res.status(200).json(getUser)
  } catch(err) {
    return next(err)
  }
}

// Get User
export const getUser = async (req, res, next) => {
  try {
    const getUser = await User.findById(req.params.id)
    return res.status(200).json(getUser)
  } catch(err) {
    return next(err)
  }
}

// Update user 
export const updateUser = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    return res.status(200).json(updateUser)
  } catch(err) {
    return next(err)
  }
} 

// Delete User 
export const deleteUser = async (req, res, next) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id)
    return res.status(200).json(deleteUser)
  } catch(err) {
    return next(err)
  }
}