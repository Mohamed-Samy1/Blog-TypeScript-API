import express from "express";

import {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController";

import { verifyUserToken } from "../middlewares/verifyUserToken";

import { 
  createBlogValidator, 
  updateBlogValidator
} from "../validators/blog.validator";

const blogRoutes = express.Router();

blogRoutes
  .route("/")
  .get(getAllBlogs)
  .post(verifyUserToken, createBlogValidator, createBlog);
  
blogRoutes
  .route("/:id")
  .get(getBlogById)
  .put(verifyUserToken, updateBlogValidator, updateBlog)
  .delete(verifyUserToken, deleteBlog);

export default blogRoutes;