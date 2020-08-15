import mongoose from 'mongoose';

export const connectDB = async () => {
  const host: string = process.env.MONGO_URI || 'mongodb://localhost';
  const port: string = process.env.MONGO_PORT || '27017';
  const database: string = process.env.MONGO_DB || 'test';
  try {
    await mongoose.connect(`${host}:${port}/${database}`, {
      useNewUrlParser: true,
      useUnifiedTopology: false
    });
    console.log(`MongoDB connected to -> ${host}:${port}/${database}`);
  } catch (err) {
    console.error(`Couldn't connect to -> ${host}:${port}/${database}`);
  }
};
