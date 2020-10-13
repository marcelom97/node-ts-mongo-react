import express from 'express';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import expressSession from 'express-session';

import { connectDB } from './services/connectDB';
import { errorHandler } from './middlewares/errorHandler';

// Puth the asbolute path of the .env file
dotenv.config({ path: './src/config/config.env' });

// Import Routers
import { userRouter } from './routes/userRouter';
import { authRouter } from './routes/authRouter';

// Init Server
const app = express();
app.use(json());
// Mount cors middleware
app.use(cors());
// Mount Logging middleware
app.use(morgan('dev'));

// Mount Cookie Parser
app.use(cookieParser());

// Mount Session Middleware
const sess = {
  name: 'session',
  secret: 'dsafiujadsfkhsdfnkahfnasdnfl,.aikusjdhfb',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production'
  }
};

app.set('trust proxy', 1); // trust first proxy

app.use(expressSession(sess));

// Needed to be able to read body data
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // support URL-encoded bodies

// Mount routers
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);

// Error Handler
app.use(errorHandler);

// Connect to Database
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port -> ${PORT}`);
});
