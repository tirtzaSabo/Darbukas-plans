const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');

// Routes for Event CRUD operations
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.post('/', eventController.createEvent);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
