import express, { Request, Response } from "express";
import blogRoutes from "./blogRoutes";
import userRoutes from "./userRoutes";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .send({ 
      message: "Blog App using TypeScript with Express.js",
      option1: "use /blogs for Blog APIs",
      option2: "use /users for User APIs"
    });
});

router.use("/blogs", blogRoutes);

router.use("/user", userRoutes);

export default router;