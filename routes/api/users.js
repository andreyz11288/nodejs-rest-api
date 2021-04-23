const express = require('express')
const router = express.Router()
const guard = require('../../helpers/guard')
const list = require('../../model/user')

router.post('/signup', async (req, res, next) => {
  const { email, password } = await req.body
  const user = await list.getUsersByEmail(email)
  if (user) {
    return next(
      res
        .status(409)
        .json({ status: 'conflict', code: 409, message: 'Email in use' })
    )
  }
  try {
    const newUser = await list.addUsers({ email, password })
    return res.status(201).json({
      status: 'success',
      code: 201,
      user: { email: newUser.email, subscription: 'starter' },
    })
  } catch (error) {
    next(error)
  }
})

router.post('/login', async (req, res, next) => {
  const { email, password } = await req.body

  try {
    const token = await list.login(email, password)
    if (token) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        token,
        user: { email, subscription: 'started' },
      })
    }
    next(res.status(401).json({ message: 'Email or password is wrong' }))
  } catch (error) {
    next(error)
  }
})

router.post('/logout', guard, async (req, res, next) => {
  try {
    const id = req.user.id
    await list.logout(id)
    return res.status(204).json({
      message: 'No Content',
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
