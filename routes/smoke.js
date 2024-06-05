const express = require('express');
const {
  createSmoke,
  getSmokes,
  getSmoke,
  deleteSmoke,
  updateSmoke,
  printSmoke
} = require('../controllers/smokeController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all smoke routes
router.use(requireAuth);

// GET all smokes
router.get('/', getSmokes);

// GET a single smoke
router.get('/:id', getSmoke);

// POST a new smoke
router.post('/', createSmoke);

// DELETE a smoke
router.delete('/:id', deleteSmoke);

// UPDATE a smoke
router.put('/:id', updateSmoke);

// PRINT a smoke
router.get('/print/:id', printSmoke);  // Add this line

module.exports = router;
