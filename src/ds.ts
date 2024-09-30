import { logger } from "./middleware/logger";

const mongoose = require("mongoose");

async function connectToDatabase() {
  mongoose.connect("mongodb://localhost:27017/usersdb");
  mongoose.connection.once("open", () => logger.info("Connected to MongoDB"));
  mongoose.connection.on("error", () => logger.error("Connection error"));
}

async function disconnectDatabase() {
  await mongoose.disconnect();
}

export { connectToDatabase, disconnectDatabase };
