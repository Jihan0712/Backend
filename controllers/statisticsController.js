const SmokeTest = require('../models/SmokeTest')
const User = require('../models/User')

const getStatistics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    const totalPassed = await SmokeTest.countDocuments({ smoke_result: 'Passed' })
    const totalFailed = await SmokeTest.countDocuments({ smoke_result: 'Failed' })
    const opacityData = await SmokeTest.find({}, 'opacity createdAt').lean()

    res.json({
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
