import { Request, Response } from 'express';
import * as businessService from '../services/business.service';

export const getAllBusinesses = async (req: Request, res: Response): Promise<void> => {
  try {
    const businesses = await businessService.getAllBusinesses();
    res.status(200).json(businesses);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getBusinessById = async (req: Request, res: Response): Promise<void> => {
  try {
    const business = await businessService.getBusinessById(req.params.id);
    if (!business) {
      res.status(404).json({ message: 'Business not found' });
      return;
    }
    res.status(200).json(business);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createBusiness = async (req: Request, res: Response): Promise<void> => {
  try {
    const newBusiness = await businessService.createBusiness(req.body);
    res.status(201).json(newBusiness);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateBusiness = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedBusiness = await businessService.updateBusiness(req.params.id, req.body);
    if (!updatedBusiness) {
      res.status(404).json({ message: 'Business not found' });
      return;
    }
    res.status(200).json(updatedBusiness);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteBusiness = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedBusiness = await businessService.deleteBusiness(req.params.id);
    if (!deletedBusiness) {
      res.status(404).json({ message: 'Business not found' });
      return;
    }
    res.status(200).json({ message: 'Business deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};




  // const businessService = require('../services/business.service');
  
  // // Controller methods for Business CRUD operations
  // exports.getAllBusinesses = async (req, res) => {
  //   try {
  //     const businesses = await businessService.getAllBusinesses();
  //     res.status(200).json(businesses);
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // };
  
  // exports.getBusinessById = async (req, res) => {
  //   try {
  //     const business = await businessService.getBusinessById(req.params.id);
  //     if (!business) {
  //       return res.status(404).json({ message: 'Business not found' });
  //     }
  //     res.status(200).json(business);
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // };
  
  // exports.createBusiness = async (req, res) => {
  //   try {
  //     const newBusiness = await businessService.createBusiness(req.body);
  //     res.status(201).json(newBusiness);
  //   } catch (err) {
  //     res.status(400).json({ message: err.message });
  //   }
  // };
  
  // exports.updateBusiness = async (req, res) => {
  //   try {
  //     const updatedBusiness = await businessService.updateBusiness(req.params.id, req.body);
  //     if (!updatedBusiness) {
  //       return res.status(404).json({ message: 'Business not found' });
  //     }
  //     res.status(200).json(updatedBusiness);
  //   } catch (err) {
  //     res.status(400).json({ message: err.message });
  //   }
  // };
  
  // exports.deleteBusiness = async (req, res) => {
  //   try {
  //     const deletedBusiness = await businessService.deleteBusiness(req.params.id);
  //     if (!deletedBusiness) {
  //       return res.status(404).json({ message: 'Business not found' });
  //     }
  //     res.status(200).json({ message: 'Business deleted successfully' });
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // };