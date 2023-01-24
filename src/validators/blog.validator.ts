import { body } from "express-validator";

export const createBlogValidator = [
  body("title")
    .exists({ checkFalsy: true })
    .withMessage("Title is required")
    .isString()
    .withMessage("Title should be string"),
  body("description")
    .exists()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description should be string"),
];

export const updateBlogValidator = [
  body("title")
    .isString()
    .withMessage("Title should be string"),
  body("description")
    .isString()
    .withMessage("Description should be string"),
];
