import User from '../model/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createError } from '../util/errors.js'

export const login = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email })
		if(!user) return next(createError(404, "User not Found"))

		const hashPass = bcrypt.compareSync(req.body.password, user.password);

		if(!hashPass) return next(createError(403, "Password not match!!"))

		const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, { expiresIn: '1h' })

		const { password, isAdmin, ...others } = user._doc;

		return res.cookie('access_token', token, { httpOnly: true }).status(200).json({ others })
	} catch(err) {
		return next(err)
	}
}

export const register = async (req, res, next) => {
	try {
		const hash = bcrypt.hashSync(req.body.password, 12)

		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hash
		})

		const savedUser = await newUser.save()
		return res.status(201).json(savedUser)
	} catch(err) {
		return next(err)
	}
}