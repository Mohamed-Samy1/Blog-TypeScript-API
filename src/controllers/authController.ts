import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { userService } from "../services/userService";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Serializer } from "../serializers/serializers";

interface profileRequest extends Request {
  user?: any;
}

export const AuthController = {

  //USER REGISTRATION
  registerUser: async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      // if there is error then return Error
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: "error",
          errors: errors.array(),
        });
      }
      const user = req.body;
      if (!user.email || !user.password) {
        return res.status(400).send({
          status: "error",
          message: "Both username and password are required",
        });
      }
      const reg_user = await userService.createUser({
        name: user.name,
        email: user.email,
        password: user.password,
      });
      res
        .status(201)
        .json({
          status: "success",
          message: "user created successfuly.",
          data: Serializer.userSerializer(reg_user)
        });
    } catch (err: any) {
      res
        .status(500)
        .json({ status: "error", message: err.message });
    }
  },

  //USER LOGIN
  loginUser: async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      // if was no errors then return error
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: "error",
          errors: errors.array(),
        });
      }

      /* check if user exists already */
      const user = await User.findOne({
        email: req.body.email,
      });
      if (!user) {
        return res.status(400).send({
          status: "error",
          message: "No account is associated with the given email",
        });
      }

      /* compare password */
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ status: "error", message: "Invalid password" });
      }
      //create token
      const token = jwt.sign(
        { _id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        {
          expiresIn: "1d",
        }
      );
      res
        .status(200)
        .json({
          status: "success",
          data: { token, user: Serializer.userSerializer(user) }
      });
    } catch (err: any) {
      res
        .status(500)
        .json({ status: "error", message: err.message });
    }
  },

  //GETTING ONE SPECIFIC USER
  getUser: async (req: profileRequest, res: Response) => {
    const user = await User.findOne({
      email: req.body.email
    });
    res
      .status(200)
      .json({
        status: "success",
        data: Serializer.userSerializer(user)
      });
  }
};
