import ServiceModel from '../models/eventType.model';
import { Types } from 'mongoose';

export interface IEventType {
  description: string;
}


export const getAllEventTypes = async (): Promise<IEventType[]> => {
  return await ServiceModel.find();
};

export const getEventTypeById = async (id: string): Promise<IEventType | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return await ServiceModel.findById(id);
};

export const createEventType = async (eventTypeData: IEventType): Promise<IEventType> => {
  const newService = new ServiceModel(eventTypeData);
  return await newService.save();
};

export const updateEventType = async (
  id: string,
  eventTypeData: Partial<IEventType>
): Promise<IEventType | null> => { 
  if (!Types.ObjectId.isValid(id)) return null;
  return await ServiceModel.findByIdAndUpdate(id, eventTypeData, { new: true });
};

export const deleteEventType = async (id: string): Promise<IEventType | null> => {
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
