const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BarSchema = new Schema({
  subdomain: String,
  authId: String,
  stripe: String,
  picture: String,
  location: String,
})

const BarModel = mongoose.model('Bar', BarSchema)

module.exports = BarModel
