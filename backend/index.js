import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import allRoutes from './routes/indexRoutes.js';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "client",)));
//   app.get("*", (req, res) => {
//       res.sendFile(path.join(__dirname, "client","index.html"));
//   });
// }

app.use(cookieParser());

app.use('/api', allRoutes);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(status).json({ message, stack: err.stack });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`server listening on ${PORT}`);
});
