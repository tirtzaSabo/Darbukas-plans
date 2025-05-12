import { Request, Response } from 'express';
import * as serviceService from '../services/service.service';

export const getAllServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await serviceService.getAllServices();
    res.status(200).json(services);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getServiceById = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await serviceService.getServiceById(req.params.id);
    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }
    res.status(200).json(service);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createService = async (req: Request, res: Response): Promise<void> => {
  try {
    const newService = await serviceService.createService(req.body);
    res.status(201).json(newService);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateService = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedService = await serviceService.updateService(req.params.id, req.body);
    if (!updatedService) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }
    res.status(200).json(updatedService);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteService = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedService = await serviceService.deleteService(req.params.id);
    if (!deletedService) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};






// const serviceService = require('../services/service.service');

// exports.getAllServices = async (req, res) => {
//   try {
//     const services = await serviceService.getAllServices();
//     res.status(200).json(services);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getServiceById = async (req, res) => {
//   try {
//     const service = await serviceService.getServiceById(req.params.id);
//     if (!service) {
//       return res.status(404).json({ message: 'Service not found' });
//     }
//     res.status(200).json(service);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.createService = async (req, res) => {
//   try {
//     const newService = await serviceService.createService(req.body);
//     res.status(201).json(newService);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.updateService = async (req, res) => {
//   try {
//     const updatedService = await serviceService.updateService(req.params.id, req.body);
//     if (!updatedService) {
//       return res.status(404).json({ message: 'Service not found' });
//     }
//     res.status(200).json(updatedService);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.deleteService = async (req, res) => {
//   try {
//     const deletedService = await serviceService.deleteService(req.params.id);
//     if (!deletedService) {
//       return res.status(404).json({ message: 'Service not found' });
//     }
//     res.status(200).json({ message: 'Service deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };