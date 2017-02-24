const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CustomerSchema = new Schema({
  authId: String,
  stripe: String,
})

module.exports = CustomerSchema
