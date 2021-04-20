const passport = require('passport')
require('../config/passport')

const guard = (reg, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return next({ status: 403, message: 'Forbidden' })
    }
    require.user = user
  })(reg, res, next)
}
module.exports = guard
