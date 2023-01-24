"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = require("./src/configs/db");
const api_1 = __importDefault(require("./src/routes/api"));
//CONNECT TO DATABASE
(0, db_1.connectDatabase)();
//MIDDLEWARES
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.use((0, morgan_1.default)("combined"));
//API ROUTES
app.get("/", (req, res) => {
    res
        .status(200)
        .send({
        message: "Blog App with TypeScript",
        direction: "Please use the latest version api/v1/"
    });
});
app.use("/api/v1/", api_1.default);
//ERROR HANDLER MIDDLEWARE
app.use(((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res
        .status(statusCode)
        .json({ message: err.message });
    return;
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is up and running at https://localhost:${PORT}`);
});
exports.default = app;
