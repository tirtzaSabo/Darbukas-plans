import Event from "../models/event.model";
import { Types, Document, PopulatedDoc } from "mongoose";
import { IUser } from "../models/user.model";
// import { IService } from '../models/service.model';

export interface IEvent {
  age?: string;
  numofParticipants?: number;
  date?: Date;
  place?: string;
  service?: string;
  user?: Types.ObjectId;
  duration?: number;
  description?: string;
  status?: string;
}

export interface IEventPopulated extends Omit<IEvent, "service" | "user"> {
  //   service?: PopulatedDoc<IService & Document>;
  user?: PopulatedDoc<IUser & Document>;
}

export const getAllEvents = async (): Promise<any> => {
  return await Event.find().populate("service"); //.populate('user');
};

export const getEventById = async (
  id: string
): Promise<IEventPopulated | null> => {
  return await Event.findById(id).populate("service").populate("user");
};

// export const createEvent = async (eventData: IEvent): Promise<IEvent> => {
//   const newEvent = new Event(eventData);
//   return await newEvent.save();
// };
export const createEvent = async (eventData: IEvent): Promise<IEvent> => {
  if (!eventData.date) {
    throw new Error("Date is required");
  }
  const date = new Date(eventData.date);    
  const startTime = new Date(date.getTime() - 60 * 60 * 1000);
  const endTime = new Date(date.getTime() + 2 * 60 * 60 * 1000); 

  const conflictingEvent = await Event.findOne({
    date: { $gte: startTime, $lte: endTime },
  });

  if (conflictingEvent) {
    const error = new Error("Date is already taken");
    throw error;
  }
  const newEvent = new Event(eventData);
  return await newEvent.save();
};

export const updateEvent = async (
  id: string,
  eventData: Partial<IEvent>
): Promise<IEventPopulated | null> => {
  return await Event.findByIdAndUpdate(id, eventData, { new: true }); //.populate('service').populate('user');
};

export const deleteEvent = async (id: string): Promise<IEvent | null> => {
  return await Event.findByIdAndDelete(id);
};

// const Event = require('../models/event.model');
// exports.getAllEvents = async () => {
//   return await Event.find().populate('service').populate('user');
// };

// exports.getEventById = async (id) => {
//   return await Event.findById(id).populate('service').populate('user');
// };

// exports.createEvent = async (eventData) => {
//   const newEvent = new Event(eventData);
//   return await newEvent.save();
// };

// exports.updateEvent = async (id, eventData) => {
//   return await Event.findByIdAndUpdate(id, eventData, { new: true }).populate('service').populate('user');
// };

// exports.deleteEvent = async (id) => {
//   return await Event.findByIdAndDelete(id);
// };
