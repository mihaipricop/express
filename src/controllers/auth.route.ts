import { Response } from "express";
import { logger } from "../middleware/logger";
import User from "../models/users.model";

// Routes for handling authentication
export async function loginUser(_req: any, res: Response) {
  try {
    res.send("Logged in successfully");
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function registerUser(req: any, res: Response) {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.send("User registered successfully");
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function logoutUser(req: any, res: Response) {
  try {
    req.logout(() => res.send("Logged out successfully"));
  } catch (error) {
    logger.error(error);
    res.status(500).send("Logout failed");
  }
}
