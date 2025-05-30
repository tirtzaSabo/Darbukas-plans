import { Request, Response } from 'express';
import * as eventService from '../services/event.service';

export const getAllEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).json(events);    
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getEventById = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await eventService.getEventById(req.params.id);
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    res.status(200).json(event);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const newEvent = await eventService.createEvent(req.body.newEvent);
    res.status(201).json(newEvent);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedEvent = await eventService.updateEvent(req.params.id, req.body.newEvent);
    if (!updatedEvent) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    res.status(200).json(updatedEvent);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedEvent = await eventService.deleteEvent(req.params.id);
    if (!deletedEvent) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};





// import eventService from '../services/event.service';
// exports.getAllEvents = async (req, res) => {
//   try {
//     const events = await eventService.getAllEvents();
//     res.status(200).json(events);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getEventById = async (req, res) => {
//   try {
//     const event = await eventService.getEventById(req.params.id);
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }
//     res.status(200).json(event);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.createEvent = async (req, res) => {
//   try {
//     const newEvent = await eventService.createEvent(req.body.newEvent);
//     res.status(201).json(newEvent);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.updateEvent = async (req, res) => {
//   try {
//     const updatedEvent = await eventService.updateEvent(req.params.id, req.body);
//     if (!updatedEvent) {
//       return res.status(404).json({ message: 'Event not found' });
//     }
//     res.status(200).json(updatedEvent);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.deleteEvent = async (req, res) => {
//   try {
//     const deletedEvent = await eventService.deleteEvent(req.params.id);
//     if (!deletedEvent) {
//       return res.status(404).json({ message: 'Event not found' });
//     }
//     res.status(200).json({ message: 'Event deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };