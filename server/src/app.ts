import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './router';

dotenv.config();
const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const app = express();
app.use(cors(corsConfig));
app.use(express.json());

app.use(router);

export default app;
