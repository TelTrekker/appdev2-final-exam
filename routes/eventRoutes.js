const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  createEvent,
  getMyEvents
} = require('../controllers/eventController');

const { protect } = require('../middleware/authMiddleware');

// Public route
router.get('/', getAllEvents);

// Protected routes
router.post('/', protect, createEvent);
router.get('/my-events', protect, getMyEvents);

module.exports = router;