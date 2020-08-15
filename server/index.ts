import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDB';

dotenv.config({ path: './config/config.env' });

const app = express();
app.use(cors());
app.use(morgan('dev'));

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port -> ${PORT}`);
});
