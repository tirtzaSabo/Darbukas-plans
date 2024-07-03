const Business = require('../models/business.model');

// Service methods for Business CRUD operations
exports.getAllBusinesses = async () => {
  return await Business.find().populate('admin', 'name email'); // Populate 'admin' field with user details
};

exports.getBusinessById = async (id) => {
  return await Business.findById(id).populate('admin', 'name email');
};

exports.createBusiness = async (businessData) => {
  const newBusiness = new Business(businessData);
  return await newBusiness.save();
};

exports.updateBusiness = async (id, businessData) => {
  return await Business.findByIdAndUpdate(id, businessData, { new: true }).populate('admin', 'name email');
};

exports.deleteBusiness = async (id) => {
  return await Business.findByIdAndDelete(id);
};
