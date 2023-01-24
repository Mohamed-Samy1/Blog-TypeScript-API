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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.getBlogById = exports.createBlog = exports.getAllBlogs = void 0;
const blogService_1 = require("../services/blogService");
const express_validator_1 = require("express-validator");
const serializers_1 = require("../serializers/serializers");
//GET ALL BLOGS
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blogService_1.BlogService.getAllBlogs();
        res
            .status(200)
            .json({
            status: "success",
            data: serializers_1.Serializer.blogsSerializer(blogs)
        });
    }
    catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
});
exports.getAllBlogs = getAllBlogs;
//CREATE A BLOG
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        // if was errors then return error
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
        req.body.author = req.user._id;
        const blog = yield blogService_1.BlogService.createBlog(req.body);
        res
            .status(200)
            .json({
            status: "success",
            message: "blog created successfully.",
            data: serializers_1.Serializer.blogSerializer(blog)
        });
    }
    catch (err) {
        res
            .status(500)
            .json({ status: "error", message: err.message });
    }
});
exports.createBlog = createBlog;
//GET A SPECIFIC BLOG BY ID
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blogService_1.BlogService.getBlogById(req.params.id);
        res
            .status(200)
            .json({
            status: "success",
            data: serializers_1.Serializer.blogSerializer(blog)
        });
    }
    catch (err) {
        res
            .status(500)
            .json({ status: "error", message: err.message });
    }
});
exports.getBlogById = getBlogById;
//UPDATE A BLOG BY ID
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blogService_1.BlogService.updateBlog(req.params.id, req.body);
        res.
            status(200).
            json({
            status: "success",
            message: "blog updated successfully.",
            data: serializers_1.Serializer.blogSerializer(blog),
        });
    }
    catch (err) {
        res
            .status(500)
            .json({ status: "error", message: err.message });
    }
});
exports.updateBlog = updateBlog;
//DELETE A BLOG BY ID
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blogService_1.BlogService.deleteBlog(req.params.id);
        res
            .status(200)
            .json({
            status: "success",
            message: "blog deleted successfully."
        });
    }
    catch (err) {
        res
            .status(500)
            .json({ status: "error", message: err.message });
    }
});
exports.deleteBlog = deleteBlog;
