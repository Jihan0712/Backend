const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
  plateNo: String,
  engineNo: String,
  chassisNo: String,
  yearModel: String,
  makeSeries: String,
  mvType: String,
  color: String,
  classification: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  smokeTest: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SmokeTest'
  }]
}, { timestamps: true })

module.exports = mongoose.model('Vehicle', vehicleSchema)
