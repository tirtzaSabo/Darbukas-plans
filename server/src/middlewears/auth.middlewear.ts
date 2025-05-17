import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const TOKEN_KEY = process.env.TOKEN_KEY || 'defaultSecretKey';

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  if (!(req.body.token || req.query.token || req.headers["authorization"])) {
     res.status(401).send("A token is required for authentication");
     return;
  }
  try {
    const decoded = jwt.verify(req.body.token || req.query.token || req.headers["authorization"],TOKEN_KEY);

    req.body.user = decoded;
  } catch (err) {
    console.error(err);    
     res.status(401).send("Invalid Token");
     return;
  }

  return next();
};


