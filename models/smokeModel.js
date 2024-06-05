const mongoose = require('mongoose')

const Schema = mongoose.Schema

const smokeSchema = new Schema({
  opacity: {
    type: Number,
    required: true
  },
  smoke_result: {
    type: String,
    required: true
  },

}, { timestamps: true })

module.exports = mongoose.model('SmokeTest', smokeSchema)