import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
dotenv.config();

connectDB();
const app = express();
const port = process.env.PORT || 5000;

const mongoUrl = process.env.MONGO_URL;
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
