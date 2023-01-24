"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "User Full Name is required"]
    },
    email: {
        type: String,
        required: [true, "User Email is required."],
        unique: [true, "User Email must be unique."],
        trim: [true],
        lowercase: [true]
    },
    password: {
        type: String,
        required: [true, "User Password is required."],
        min: 8
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        required: true,
        default: "user"
    }
}, {
    timestamps: true,
});
//before saving --> encrypt the password and use salt 
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcryptjs_1.default.genSalt();
        this.password = yield bcryptjs_1.default.hash(this.password, salt);
        next();
    });
});
userSchema.statics.login = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ email });
        if (user) {
            const isAuthenticated = yield bcryptjs_1.default.compare(password, user.password);
            if (isAuthenticated) {
                return user;
            }
            else {
                throw Error("Incorrect password");
            }
        }
        else {
            throw Error("Incorrect email");
        }
    });
};
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
