import ServiceModel from '../models/service.model';
import { Types } from 'mongoose';

export interface IService {
  description: string;
}


export const getAllServices = async (): Promise<IService[]> => {
  return await ServiceModel.find();
};

export const getServiceById = async (id: string): Promise<IService | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return await ServiceModel.findById(id);
};

export const createService = async (serviceData: IService): Promise<IService> => {
  const newService = new ServiceModel(serviceData);
  return await newService.save();
};

export const updateService = async (
  id: string,
  serviceData: Partial<IService>
): Promise<IService | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return await ServiceModel.findByIdAndUpdate(id, serviceData, { new: true });
};

export const deleteService = async (id: string): Promise<IService | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return await ServiceModel.findByIdAndDelete(id);
};






// const Service = require('../models/service.model');

// // Service methods for Service CRUD operations
// exports.getAllServices = async () => {
//   return await Service.find();
// };

// exports.getServiceById = async (id) => {
//   return await Service.findById(id);
// };

// exports.createService = async (serviceData) => {
//   const newService = new Service(serviceData);
//   return await newService.save();
// };

// exports.updateService = async (id, serviceData) => {
//   return await Service.findByIdAndUpdate(id, serviceData, { new: true });
// };

// exports.deleteService = async (id) => {
//   return await Service.findByIdAndDelete(id);
// };
