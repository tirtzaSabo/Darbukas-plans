import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';

const TOKEN_KEY = process.env.TOKEN_KEY || 'defaultSecretKey';

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, phone, email, password } = req.body;

        if (!(email && password && name && phone)) {
            res.status(400).send("All input is required");
            return;
        }

        const oldUser = await UserModel.exists({ email });
        if (oldUser) {
            res.status(409).send("User already exists");
            return;
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            name,
            phone,
            email,
            password: encryptedPassword
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            TOKEN_KEY,
            { expiresIn: "2h" }
        );

        user.token = token;
        await user.save();

        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send("All input is required");
            return;
        }

        const user = await UserModel.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(400).send("Invalid credentials");
            return;
        }

        const token = jwt.sign(
            { user_id: user._id, email },
            TOKEN_KEY,
            { expiresIn: "2h" }
        );

        user.token = token;

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

export const logout = (req: Request, res: Response): void => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0)
        });
        res.status(200).send("Logged out");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

export const getUserFromToken = async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies.token || req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    try {
        const decoded = jwt.verify(token, TOKEN_KEY) as { user_id: string };
        const user = await UserModel.findById(decoded.user_id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

export const getAllUsers = async (): Promise<typeof UserModel[]> => {
    return await UserModel.find();
};

export const getUserById = async (id: string): Promise<typeof UserModel | null> => {
    return await UserModel.findById(id);
};

export const updateUser = async (id: string, userData: Partial<typeof UserModel>): Promise<typeof UserModel | null> => {
    return await UserModel.findByIdAndUpdate(id, userData, { new: true });
};

export const deleteUser = async (id: string): Promise<typeof UserModel | null> => {
    return await UserModel.findByIdAndDelete(id);
};




// const userModel = require('../models/user.model')
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// exports.signup = async (req, res) => {
//     try {
//         const { name, phone, email, password } = req.body;
//         if (!(email && password && name && phone)) {
//             res.status(400).send("All input is required");
//         }
//         let oldUser;
//         await userModel.exists({ email: email }).then(res => { oldUser = res });
//         if (oldUser) {
//             return res.status(409).send("User Already Exist")
//         }
//         const encryptedPassword = await bcrypt.hash(password, 10);
//         const user = new userModel({ name: name, phone: phone, email: email, password: encryptedPassword });
//         const token = jwt.sign({ user_id: user._id, email: email },
//             "" + process.env.TOKEN_KEY, {
//             expiresIn: "2h",
//         }
//         );
//         user.token=token;
//         await user.save();
//         // res.cookie('token',token, {
//         //     httpOnly: true,
//         //     sameSite: 'Lax',
//         //     maxAge: 1000 * 60 * 60 * 24 * 14
//         // });
//         res.status(201).json(user);            
//     } catch (err) {
//         console.error(err);
//     }

// }
// exports.signin = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         if (!(email && password)) {
//             res.status(400).send("All input is required");
//         }
//         let user;
//         await userModel.findOne({ email: email }).then(res => { user = res });
//         if (!user) {
//             return res.status(409).send("User is not exists")
//         }
//         if (user && (await bcrypt.compare(password, user.password))) {
//             const token = jwt.sign({ user_id: user._id, email: email },
//                 " " + process.env.TOKEN_KEY, {
//                 expiresIn: "2h",
//             }
//             );
//             user.token = token;
//             // res.cookie('token',token, {
//             //      httpOnly: true,
//             //     sameSite: 'Lax',
//             //     maxAge: 1000 * 60 * 60 * 24 * 14,
//             // }); 
//             res.status(200).json(user);            
//         }
//         else
//             res.status(400).send("Invalid Credentials");
//     } catch (err) {
//         console.error(err);
//     }
// }
// exports.logout = async (req, res) => {
//     try {
//         res.cookie("token", "", {
//             httpOnly: true,
//             expires: new Date(0)
//         });
//         res.status(200).send("Logged out");
//     } catch (error) {
//         console.error(error); 
//     }
// }
// exports.getUserFromToken= async (req, res) => {    
//     if (req.cookies.token||req.body.token || req.query.token || req.headers["x-access-token"]) {
//         try {
//             const decoded = jwt.verify(req.cookies.token||req.body.token || req.query.token || req.headers["x-access-token"]," "+process.env.TOKEN_KEY);          
//             const user =await this.getUserById(decoded.user_id);        
//           return res.status(200).json({ user });
//         } catch (err) {
//             console.error(err);
            
//           return res.status(401).json({ message: 'Invalid token' });
//         }}
//         return res.status(401).json({ message: 'No token provided' });
//     }
// exports.getAllUsers = async () => {
//     return await userModel.find();
// };

// exports.getUserById = async (id) => {
//     return await userModel.findById(id);
// };

// exports.updateUser = async (id, userData) => {
//     return await User.findByIdAndUpdate(id, userData, { new: true });
// };

// exports.deleteUser = async (id) => {
//     return await User.findByIdAndDelete(id);
// };