// const jwt = require("jsonwebtoken")
// const verifyToken = (req, res, next) => {
//     if (!(req.body.token || req.query.token || req.headers["x-access-token"])) {
//         return res.status(403).send("A token is required for authentication")
//     }
//     try {
//         const decoded = jwt.verify(req.body.token || req.query.token || req.headers["x-access-token"]," "+process.env.TOKEN_KEY);
//         req.user = decoded;
//     } catch (err) {
//         return res.status(401).send("Invalid Token");
//     }
//     return next();
// };
// module.exports= verifyToken;
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const TOKEN_KEY = process.env.TOKEN_KEY || 'defaultSecretKey';

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  if (!(req.body.token || req.query.token || req.headers["x-access-token"])) {
     res.status(403).send("A token is required for authentication");
     return;
  }

  try {
    const decoded = jwt.verify(req.body.token || req.query.token || req.headers["x-access-token"],TOKEN_KEY);

    req.body.user = decoded;
  } catch (err) {
    console.error(err);    
     res.status(401).send("Invalid Token");
     return;
  }

  return next();
};

