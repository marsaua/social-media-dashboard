import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

type JWTUserData = {
  id: string;
  username: string;
};

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization?.split(" ")[1];

  if (!bearerToken) {
    return res
      .status(401)
      .json({ message: "No or invalid token provided. Access denied." });
  }

  try {
    req.user = jwt.verify(
      bearerToken,
      process.env.ACCESS_TOKEN_SECRET!,
    ) as JWTUserData;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

export default verifyJWT;
