import { Response } from "express";
import { logger } from "../middleware/logger";
import User from "../models/users.model";
import mongoose from "mongoose";

// Routes for handling authentication
export async function loginUser(_req: any, res: Response) {
  try {
    res.status(200).json({ message: "Logged in successfully" });
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
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {    
    logger.error(error);
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map(err => err.message);
      res.status(400).json({ error: 'Validation Error', messages: errors });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export async function logoutUser(req: any, res: Response) {
  try {
    req.logout(() => res.status(200).json({message:"Logged out successfully"}));
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Logout failed"});
  }
}
