import { Mongoose } from 'mongoose';
import logger from './logger';

async function connectToDatabase(mongoose: Mongoose) {
  const MONGO_URI = `mongodb+srv://${process.env.MONGO_ROOT_USERNAME}:${process.env.MONGO_ROOT_PASSWORD}@nodeexpressprojects.fybod5p.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

  // const mongoDev = 'mongodb://mongo-server:27017/test';

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(MONGO_URI);
    logger.info(`Connected to database`);
  } catch (error) {
    logger.error(`Could not connect to database`);
    process.exit(1);
  }
}

export default connectToDatabase;
