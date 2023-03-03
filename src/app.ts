import express, { Application, Request, Response } from "express";
const app: Application = express();
import {v4 as uuidv4} from 'uuid';
import { AdminRouter } from "./routes/Admin.routes";
import { UserRouter } from "./routes/User.routes";
app.use(express.json());


app.use('/admin', AdminRouter);
app.use('/users', UserRouter);
app.get("/", (req: Request, res: Response) => {
  res.send('Server running!');
})

export default app;