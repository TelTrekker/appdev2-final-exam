const Event = require('../models/Event');

// GET all public events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('userId', 'name email');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch events' });
  }
};

// POST new event (requires auth)
const createEvent = async (req, res) => {
  const { title, location, date, description } = req.body;

  if (!title || !location || !date) {
    return res.status(400).json({ message: 'Title, location, and date are required' });
  }

  try {
    const event = await Event.create({
      title,
      location,
      date,
      description,
      userId: req.user._id
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create event' });
  }
};

// GET events created by the logged-in user
const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user._id });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your events' });
  }
};

module.exports = {
  getAllEvents,
  createEvent,
  getMyEvents
};