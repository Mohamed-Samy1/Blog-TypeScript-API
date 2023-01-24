import express from "express";
import { AuthController } from "../controllers/authController";
import { UserController } from "../controllers/userController";
import { verifyUserToken } from "../middlewares/verifyUserToken";
import { createUserValidator, loginUserValidator } from "../validators/user.validator";

const userRoutes = express.Router();

userRoutes
  .post(
    "/register", 
    createUserValidator, 
    AuthController.registerUser
  );

userRoutes
  .post(
    "/login", 
    loginUserValidator, 
    AuthController.loginUser
  );

userRoutes
  .post(
    "/getUser", 
    verifyUserToken, 
    AuthController.getUser
  );

userRoutes.get(
  "/list", 
  verifyUserToken, 
  UserController.getAllUsers
  );

export default userRoutes;
