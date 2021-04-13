const mongoose = require('mongoose')
require('dotenv').config()
mongoose.Promise = global.Promise
mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
const Schema = mongoose.Schema

const db = new Schema({
  name: String,
  email: String,
  phone: String,
  favorite: Boolean,
})

module.exports = db
