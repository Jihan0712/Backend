const SmokeTest = require('../models/smokeModel')
const User = require('../models/userModel')

const getStatistics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    const totalPassed = await SmokeTest.countDocuments({ smoke_result: 'Passed' })
    const totalFailed = await SmokeTest.countDocuments({ smoke_result: 'Failed' })
    const opacityData = await SmokeTest.find({}, 'opacity').lean()

    res.status(200).json({
      totalUsers,
      totalPassed,
      totalFailed,
      opacityData
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  getStatistics
}
