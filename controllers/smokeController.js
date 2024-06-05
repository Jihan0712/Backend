const SmokeTest = require('../models/smokeModel');
const mongoose = require('mongoose');
const generateDocument = require('../utils/generateDocument');
const Vehicle = require('../models/vehicleModel');

//print
const printSmoke = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such data' });
  }

  const smoke = await SmokeTest.findById(id);

  if (!smoke) {
    return res.status(404).json({ error: 'No such data' });
  }

  try {
    const stream = await generateDocument(smoke);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=smoke_test.pdf');
    stream.pipe(res);
  } catch (error) {
    console.error('Error generating document:', error);
    res.status(500).json({ error: 'Error generating document' });
  }
};


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


// Get vehicle details
const getVehicleDetails = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such vehicle' });
  }

  const vehicle = await Vehicle.findById(id);

  if (!vehicle) {
    return res.status(404).json({ error: 'No such vehicle' });
  }

  res.status(200).json(vehicle);
};


module.exports = {
  createSmoke,
  getSmokes,
  getSmoke,
  deleteSmoke,
  updateSmoke,
  printSmoke, // Ensure printSmoke is exported
  getVehicleDetails // Export getVehicleDetails
};