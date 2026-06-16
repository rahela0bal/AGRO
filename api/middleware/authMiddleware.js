import jwt from 'jsonwebtoken'

const JWT_SECRET = 'secret-change-me'

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization']

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ success: false, message: 'Token lipsă.' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.user = payload
    next()
  } catch (err) {
    return res.status(401).send({ success: false, message: 'Token invalid sau expirat.' })
  }
}
