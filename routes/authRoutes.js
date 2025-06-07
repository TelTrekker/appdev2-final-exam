const express = require('express');
const router = express.Router();
const { signin } = require('../controllers/authController');

// POST /api/auth/signin
router.post('/signin', signin);

module.exports = router;
