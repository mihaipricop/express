import {logger} from './middleware/logger';
import app from "./app";
import { connectToDatabase } from './ds';

const PORT = 5001;

const startServer = async () => {
  connectToDatabase();
  app.listen(PORT, () => {
    logger.info(`backend is running on http://localhost:${PORT}`);
  });
};

startServer();