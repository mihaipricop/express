import { Response } from "express";
import { logger } from "../middleware/logger";
import Data from "../models/data.model"
import mongoose from "mongoose";

export async function getAllData(req: any, res: Response) {
  if (!req.isAuthenticated()) return res.status(401).send('You are not authenticated');
  try {
    logger.info("get all data request received");
    const data = await Data.find({ owner: req.user.username });
    res.status(200).json(data);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getData(req: any, res: Response) {
  if (!req.isAuthenticated()) return res.status(401).send('You are not authenticated');
  try {
    logger.info("get single data request received");
    const data = await Data.findOne({_id: req.params.id, owner: req.user.username});
    if (!data) {
      res.status(404).json({ error: "Data Not Found" });
      return;
    }
    res.status(200).json(data);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export async function createData(req: any, res: Response) {
  if (!req.isAuthenticated()) return res.status(401).send('You are not authenticated');
  try {
    logger.info("data create request received");
    const { name, email, phone, address, birthday, course, semester, year } = req.body;
    const data = new Data({ name, email, phone, address, birthday, course, semester, year, owner: req.user.username});
    await data.save();
    res.status(201).json(data);
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
export async function updateData(req: any, res: Response) {
  if (!req.isAuthenticated()) return res.status(401).send('You are not authenticated');
  try {
    logger.info("data update request received");
    const { name, email, phone, address, birthday, course, semester, year } = req.body;
    const data = await Data.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.username },
      { name, email, phone, address, birthday, course, semester, year },
      { new: true, runValidators: true }
    );
    if (!data) return res.status(404).json({ error: "Data Not Found" });
    res.status(200).json(data);
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
export async function deleteData(req: any, res: Response) {
  if (!req.isAuthenticated()) return res.status(401).send('You are not authenticated');
  try {
    logger.info("data delete request received");
    const data = await Data.findOneAndDelete({_id: req.params.id, owner: req.user.username});
    if (!data) return res.status(404).json({ error: "Data Not Found" });
    res.status(204).json();
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
