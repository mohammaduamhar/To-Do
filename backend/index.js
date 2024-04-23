import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import allRoutes from './routes/indexRoutes.js'

dotenv.config();

const PORT = process.env.PORT || 8000;



const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());


app.use('/api', allRoutes);



app.listen(PORT, () => {
  connectDB();
  console.log(`server listening on ${PORT}`);
});