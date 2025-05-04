// const Business = require('../models/business.model');

// exports.getAllBusinesses = async () => {
//   return await Business.find().populate('admin', 'name email'); // Populate 'admin' field with user details
// };

// exports.getBusinessById = async (id) => {
//   return await Business.findById(id).populate('admin', 'name email');
// };

// exports.createBusiness = async (businessData) => {
//   const newBusiness = new Business(businessData);
//   return await newBusiness.save();
// };

// exports.updateBusiness = async (id, businessData) => {
//   return await Business.findByIdAndUpdate(id, businessData, { new: true }).populate('admin', 'name email');
// };

// exports.deleteBusiness = async (id) => {
//   return await Business.findByIdAndDelete(id);
// };
import Business from '../models/business.model';
import { Types, Document, PopulatedDoc } from 'mongoose';
import { IUser } from '../models/user.model';

export interface IBusiness {
  name: string;
  admin: Types.ObjectId;
}

export interface IBusinessPopulated extends Omit<IBusiness, 'admin'> {
  admin: PopulatedDoc<IUser & Document>;
}

export const getAllBusinesses = async (): Promise<IBusinessPopulated[]> => {
  return await Business.find().populate('admin', 'name email');
};

export const getBusinessById = async (id: string): Promise<IBusinessPopulated | null> => {
  return await Business.findById(id).populate('admin', 'name email');
};

export const createBusiness = async (businessData: IBusiness): Promise<IBusiness> => {
  const newBusiness = new Business(businessData);
  return await newBusiness.save();
};

export const updateBusiness = async (id: string,businessData: Partial<IBusiness>):
 Promise<IBusinessPopulated | null> => {
  return await Business.findByIdAndUpdate(id, businessData, { new: true }).populate('admin', 'name email');
};

export const deleteBusiness = async (id: string): Promise<IBusiness | null> => {
  return await Business.findByIdAndDelete(id);
};
