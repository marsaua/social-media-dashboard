import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: any;
}

const verifyJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization?.split(" ")[1];

  if (!bearerToken) {
    return res
      .status(401)
      .json({ message: "No or invalid token provided. Access denied." });
  }

  try {
    req.user = jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET!);
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

export default verifyJWT;
