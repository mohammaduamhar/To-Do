import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 8000;
dotenv.config();

app.listen(PORT, () => {
  connectDB();
  console.log(`server listening on ${PORT}`);
});
