import { Router } from 'express'
import { authController, refreshController } from '../controller/authController.js'

const router = Router()

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const result = await authController(username, password)
  res.send(result)
})

router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body
  const result = await refreshController(refreshToken)
  if (result.success) {
    res.status(200).send(result)
  } else {
    res.status(401).send(result)
  }
})

export default router
