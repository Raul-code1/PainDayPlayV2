import * as dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

import connectToDatabase from './utils/connect';
import routes from './routes/routes';
import logger from './utils/logger';

const port: string | number = process.env.PORT || 9000;

const app: Express = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

app.listen(port, async () => {
  logger.info(`App running on port ${port}`);
  await connectToDatabase(mongoose);
  routes(app);
});
