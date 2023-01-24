"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogRoutes_1 = __importDefault(require("./blogRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res
        .status(200)
        .send({
        message: "Blog App using TypeScript with Express.js",
        option1: "use /blogs for Blog APIs",
        option2: "use /users for User APIs"
    });
});
router.use("/blogs", blogRoutes_1.default);
router.use("/user", userRoutes_1.default);
exports.default = router;
