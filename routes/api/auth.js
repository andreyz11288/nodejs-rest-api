const express = require('express')
const router = express.Router()
const list = require('../../model/user')
const jwt = require('jsonwebtoken')

router.get('/login', async (req, res, next) => {
  try {
    const { email, password } = await req.params
    const data = await list.login(email, password)
    // if (getContactId.length !== 0) {
    //   res.status(200).json({
    //     status: 'success',
    //     code: 200,
    //     data: getContactId,
    //   })
    // } else {
    //   res.status(404).json({
    //     status: 'Error',
    //     code: 404,
    //     message: 'Not found',
    //   })
    // }
  } catch (error) {
    next(error)
  }
})

router.post('/logout', async (req, res, next) => {
  try {
    const { id } = await req.params
    const data = await list.logout(id)
    // if (!listAdd) {
    //   return res.status(400).json({ message: 'missing required name field' })
    // }
    // res.status(201).json({
    //   status: 'success',
    //   code: 201,
    //   data: listAdd,
    // })
  } catch (error) {
    next(error)
  }
})

module.exports = router
