import express from 'express';
import cors from 'cors';
import { createServer } from "http";
import config from './config.js';
import route from './routes/index.js';

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route init
route(app);

httpServer.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);