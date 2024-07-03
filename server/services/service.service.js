const Service = require('../models/service.model');

// Service methods for Service CRUD operations
exports.getAllServices = async () => {
  return await Service.find();
};

exports.getServiceById = async (id) => {
  return await Service.findById(id);
};

exports.createService = async (serviceData) => {
  const newService = new Service(serviceData);
  return await newService.save();
};

exports.updateService = async (id, serviceData) => {
  return await Service.findByIdAndUpdate(id, serviceData, { new: true });
};

exports.deleteService = async (id) => {
  return await Service.findByIdAndDelete(id);
};
