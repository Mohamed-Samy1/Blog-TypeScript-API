import { body } from "express-validator";
import User from "../models/user";

export const createUserValidator = [
  body("name")
    .exists()
    .withMessage("Name is required"),
  body("email")
    .exists()
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Provide valid email")

    // Validate if email is already in use
    .custom(async (email) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("Email already in use");
      }
    }),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 5 characters"),
];

export const loginUserValidator = [
  body("email")
    .optional()
    .isEmail()
    .withMessage("Provide valid email"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string"),
];

export const updateBlogValidator = [
  body("email")
    .isString()
    .withMessage("Title should be string"),
  body("description")
    .isString()
    .withMessage("Description should be string"),
];
