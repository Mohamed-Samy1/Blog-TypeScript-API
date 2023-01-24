"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const userController_1 = require("../controllers/userController");
const verifyUserToken_1 = require("../middlewares/verifyUserToken");
const user_validator_1 = require("../validators/user.validator");
const userRoutes = express_1.default.Router();
userRoutes.post("/register", user_validator_1.createUserValidator, authController_1.AuthController.registerUser);
userRoutes.post("/login", user_validator_1.loginUserValidator, authController_1.AuthController.loginUser);
userRoutes.post("/getUser", verifyUserToken_1.verifyUserToken, authController_1.AuthController.getUser);
userRoutes.get("/list", verifyUserToken_1.verifyUserToken, userController_1.UserController.getAllUsers);
exports.default = userRoutes;
