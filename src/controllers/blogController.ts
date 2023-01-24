import { Request, Response } from "express";
import { BlogService } from "../services/blogService";
import { validationResult } from "express-validator";
import { Serializer } from "../serializers/serializers";

interface userRequest extends Request {
  user?: any;
}

//GET ALL BLOGS
export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await BlogService.getAllBlogs();
    res
      .status(200)
      .json({ 
        status: "success", 
        data: Serializer.blogsSerializer(blogs) 
      });
  } catch (err: any) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

//CREATE A BLOG
export const createBlog = async (req: userRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    // if was errors then return error
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    req.body.author = req.user._id;
    const blog = await BlogService.createBlog(req.body);
    res
      .status(200)
      .json({
        status: "success",
        message: "blog created successfully.",
        data: Serializer.blogSerializer(blog)
      });
  } catch (err: any) {
    res
      .status(500)
      .json({ status: "error", message: err.message });
  }
};

//GET A SPECIFIC BLOG BY ID
export const getBlogById = async (req: Request, res: Response) => {
  try {
    const blog = await BlogService.getBlogById(req.params.id);
    res
      .status(200)
      .json({ 
        status: "success", 
        data: Serializer.blogSerializer(blog) 
      });
  } catch (err: any) {
    res
      .status(500)
      .json({ status: "error", message: err.message });
  }
};

//UPDATE A BLOG BY ID
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const blog = await BlogService.updateBlog(req.params.id, req.body);
    res.
      status(200).
      json({
        status: "success",
        message: "blog updated successfully.",
        data: Serializer.blogSerializer(blog),
      });
  } catch (err: any) {
    res
      .status(500)
      .json({ status: "error", message: err.message });
  }
};

//DELETE A BLOG BY ID
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const blog = await BlogService.deleteBlog(req.params.id);
    res
      .status(200)
      .json({ 
        status: "success", 
        message: "blog deleted successfully." 
      });
  } catch (err: any) {
    res
      .status(500)
      .json({ status: "error", message: err.message });
  }
};
