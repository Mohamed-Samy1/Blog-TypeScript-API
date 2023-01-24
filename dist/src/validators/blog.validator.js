"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogValidator = exports.createBlogValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createBlogValidator = [
    (0, express_validator_1.body)("title")
        .exists({ checkFalsy: true })
        .withMessage("Title is required")
        .isString()
        .withMessage("Title should be string"),
    (0, express_validator_1.body)("description")
        .exists()
        .withMessage("Description is required")
        .isString()
        .withMessage("Description should be string"),
];
exports.updateBlogValidator = [
    (0, express_validator_1.body)("title")
        .isString()
        .withMessage("Title should be string"),
    (0, express_validator_1.body)("description")
        .isString()
        .withMessage("Description should be string"),
];
