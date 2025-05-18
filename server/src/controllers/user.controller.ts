// const User = require('../models/user.model');
// const userService = require('../services/user.service');

// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await userService.getAllUsers();
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getUserById = async (req, res) => {
//   try {
//     const user = await userService.getUserById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.signup = async (req, res) => {
//   try {
//     const newUser = await userService.signup(req, res);
//     res.status(201).json(newUser);
//   } catch (err) {
//     res.status(400).json({ message: err.message});
//   }
// };
// exports.signin = async (req, res) => {
//   try {
//     const newUser = await userService.signin(req, res);
//     res.status(201).json(newUser);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };
// exports.logout = async (req, res) => {
//   try {
//     await userService.logout(req, res);
//   } catch (err) {
//     console.error(err);

//   }
// };
// exports.getUserFromToken = async (req, res) => {
//   try {  
//     await userService.getUserFromToken(req, res);
//   } catch (error) {
//     console.error(error);

//   }
// }
// exports.updateUser = async (req, res) => {
//   try {
//     const updatedUser = await userService.updateUser(req.params.id, req.body);
//     if (!updatedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json(updatedUser);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     const deletedUser = await userService.deleteUser(req.params.id);
//     if (!deletedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = await userService.signup(req, res);
    res.status(201).json(newUser);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  try { 
    const user = await userService.signin(req, res);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    await userService.logout(req, res);
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Logout failed' });
  }
};

export const getUserFromToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.getUserFromToken(req, res);
    res.status(200).json(user);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Unable to retrieve user from token' });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body.newUser);
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};



