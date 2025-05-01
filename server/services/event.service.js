const Event = require('../models/event.model');
exports.getAllEvents = async () => {
  return await Event.find().populate('service').populate('user');
};

exports.getEventById = async (id) => {
  return await Event.findById(id).populate('service').populate('user');
};

exports.createEvent = async (eventData) => {
  const newEvent = new Event(eventData);
  return await newEvent.save();
};

exports.updateEvent = async (id, eventData) => {
  return await Event.findByIdAndUpdate(id, eventData, { new: true }).populate('service').populate('user');
};

exports.deleteEvent = async (id) => {
  return await Event.findByIdAndDelete(id);
};
