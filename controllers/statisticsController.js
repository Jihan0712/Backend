const SmokeTest = require('../models/smokeModel')
const Vehicle = require('../models/vehicleModel')
const User = require('../models/userModel')

const getStatistics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    const totalPassed = await SmokeTest.countDocuments({ smoke_result: 'Passed' })
    const totalFailed = await SmokeTest.countDocuments({ smoke_result: 'Failed' })

    // Aggregate the mvType data
    const mvTypeData = await Vehicle.aggregate([
      { $group: { _id: "$mvType", count: { $sum: 1 } } }
    ])

    res.status(200).json({
      totalUsers,
      totalPassed,
      totalFailed,
      mvTypeData
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  getStatistics
}
