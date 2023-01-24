import express, {
  Express,
  Request,
  Response,
  ErrorRequestHandler,
} from "express";

import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { connectDatabase } from "./src/configs/db";
import router from "./src/routes/api";

//CONNECT TO DATABASE
connectDatabase();

//MIDDLEWARES
const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("combined"));

//API ROUTES
app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .send({ 
      message: "Blog App with TypeScript",
      direction: "Please use the latest version api/v1/" 
    });
});

app.use("/api/v1/", router);

//ERROR HANDLER MIDDLEWARE
app.use(((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res
    .status(statusCode)
    .json({ message: err.message });
  return;
}) as ErrorRequestHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is up and running at https://localhost:${PORT}`);
});

export default app;