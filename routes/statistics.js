const express = require('express')
const router = express.Router()
const { getStatistics } = require('../controllers/statisticsController')
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

router.get('/statistics', getStatistics)

module.exports = router
