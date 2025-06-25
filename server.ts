  // src/server.ts
  import express, { Request, Response } from 'express';
  import dotenv from 'dotenv';
  import cors from 'cors'
  import run from './config/db'; 
  import authRoutes from './routes/authRoutes'
  dotenv.config();
console.log("Hhhhd")
  const port = process.env.PORT || 5000;
  const app = express();

  run(); // connect to MongoDB
  app.use(cors({
        origin: 'http://localhost:5173'
      }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // ✅ Register the auth routes
  app.use('/api/auth', authRoutes);

  app.get('/', (req, res: Response) => {
    res.send('Hello World!');
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
