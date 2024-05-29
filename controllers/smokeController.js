const SmokeTest = require('../models/smokeModel')
const mongoose = require('mongoose')

// get all smokes
const getSmokes = async (req, res) => {
  const smokes = await SmokeTest.find({}).sort({createdAt: -1})

  res.status(200).json(smokes)
}

// get a single smoke
const getSmoke = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such data'})
  }

  const smoke = await SmokeTest.findById(id)

  if (!smoke) {
    return res.status(404).json({error: 'No such data'})
  }
  
  res.status(200).json(smoke)
}


// create a new smoke
const createSmoke = async (req, res) => {
  const {opacity, smoke_result} = req.body

  // add to the database
  try {
    const smoke = await SmokeTest.create({ opacity, smoke_result })
    res.status(200).json(smoke)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


// delete a smoke
const deleteSmoke = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such smoke result'})
  }

  const smoke = await SmokeTest.findOneAndDelete({_id: id})

  if (!smoke) {
    return res.status(400).json({error: 'No such smoke result'})
  }

  res.status(200).json(smoke)
}

// update a smoke
const updateSmoke = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such smoke'})
  }

  const smoke = await SmokeTest.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!smoke) {
    return res.status(400).json({error: 'No such smoke'})
  }

  res.status(200).json(smoke)
}


module.exports = {
  createSmoke,
  getSmokes,
  getSmoke,
  deleteSmoke,
  updateSmoke
}