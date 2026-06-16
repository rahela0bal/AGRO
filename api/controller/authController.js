import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../database/entities/user.model.js'

const JWT_SECRET = 'secret-change-me'
const JWT_REFRESH_SECRET = 'refresh-secret-change-me'
const ACCESS_TOKEN_EXPIRES_IN = '1m'
const REFRESH_TOKEN_EXPIRES_IN = '7d'

function signAccessToken(user) {
  return jwt.sign(
    { id: user.dataValues.id, username: user.dataValues.username },
    JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
  )
}

function signRefreshToken(userId) {
  return jwt.sign(
    { id: userId, type: 'refresh' },
    JWT_REFRESH_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
  )
}

export const authController = async (username, password) => {
  if (!username || !password) {
    return { success: false, message: 'Username și parola sunt obligatorii.' }
  }

  // Fallback hardcodat pentru admin/admin
  if (username === 'admin' && password === 'admin') {
    const fakeUser = { dataValues: { id: 0, username: 'admin' } }
    const token = signAccessToken(fakeUser)
    const refreshToken = signRefreshToken(0)
    return { success: true, token, refreshToken }
  }

  try {
    const user = await User.findOne({ where: { username } })

    if (!user) {
      return { success: false, message: 'Userul nu există.' }
    }

    const passwordMatch = await bcrypt.compare(password, user.dataValues.password)

    if (!passwordMatch) {
      return { success: false, message: 'Parolă incorectă.' }
    }

    const token = signAccessToken(user)
    const refreshToken = signRefreshToken(user.dataValues.id)

    return { success: true, token, refreshToken }
  } catch (err) {
    console.error('authController error:', err)
    return { success: false, message: 'Eroare server.' }
  }
}

export const refreshController = async (refreshToken) => {
  if (!refreshToken) {
    return { success: false, message: 'Refresh token lipsă.' }
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET)

    if (decoded.type !== 'refresh') {
      return { success: false, message: 'Token invalid.' }
    }

    // Fallback pentru admin (id: 0)
    if (decoded.id === 0) {
      const fakeUser = { dataValues: { id: 0, username: 'admin' } }
      const token = signAccessToken(fakeUser)
      const newRefreshToken = signRefreshToken(0)
      return { success: true, token, refreshToken: newRefreshToken }
    }

    const user = await User.findOne({ where: { id: decoded.id } })

    if (!user) {
      return { success: false, message: 'Userul nu mai există.' }
    }

    const token = signAccessToken(user)
    const newRefreshToken = signRefreshToken(user.dataValues.id)

    return { success: true, token, refreshToken: newRefreshToken }
  } catch (err) {
    console.error('refreshController error:', err)
    return { success: false, message: 'Refresh token expirat sau invalid.' }
  }
}
