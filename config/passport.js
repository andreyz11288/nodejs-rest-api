const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET_KEY
const users = require('../model/user')

const params = {
  secretOrKey: 'secret',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

passport.use(
  new Strategy(params, async function (payload, done) {
    try {
      const user = users.getUsersById(payload.id)
      console.log(user)
      if (!user) {
        return done(Error('User not found'))
      }
      if (!user.token) {
        return done(null, user)
      }
    } catch (err) {
      done(err)
    }
  })
)
