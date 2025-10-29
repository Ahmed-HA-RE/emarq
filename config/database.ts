import { connect } from 'mongoose';
import chalk from 'chalk';

const connectDB = async () => {
  const MONGO_URI = process.env.MONGODB_URI;
  try {
    if (MONGO_URI) {
      const { connection } = await connect(MONGO_URI);
      console.log(
        chalk.cyan.underline(
          `MongoDB is connected on ${connection.name} database`
        )
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
