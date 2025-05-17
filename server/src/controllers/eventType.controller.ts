import { Request, Response } from 'express';
import * as EventTypeService from '../services/eventType.service';

export const getAllEventTypes = async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await EventTypeService.getAllEventTypes();
    res.status(200).json(services);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getEventTypeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const eventType = await EventTypeService.getEventTypeById(req.params.id);
    if (!eventType) {
      res.status(404).json({ message: 'EventType not found' });
      return;
    }
    res.status(200).json(eventType);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createEventType = async (req: Request, res: Response): Promise<void> => {
  try {
    const newEventType = await EventTypeService.createEventType(req.body.newEventType);
    res.status(201).json(newEventType);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateEventType = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedEventType = await EventTypeService.updateEventType(req.params.id, req.body.newEventType);
    if (!updatedEventType) {
      res.status(404).json({ message: 'EventType not found' });
      return;
    }
    res.status(200).json(updatedEventType);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteEventType = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedEventType = await EventTypeService.deleteEventType(req.params.id);
    if (!deletedEventType) {
      res.status(404).json({ message: 'EventType not found' });
      return;
    }
    res.status(200).json({ message: 'EventType deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};