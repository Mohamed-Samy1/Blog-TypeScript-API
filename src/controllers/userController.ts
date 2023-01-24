import { userService } from "../services/userService";
import { Request, Response } from "express";
import { Serializer } from "../serializers/serializers";

export const UserController = {

  //GET ALL USERS
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await userService.getAllUsers();
      res
        .status(200)
        .json({ 
          status: "success", 
          data: Serializer.usersSerializer(users) 
        });
    } 
    catch (err: any) {
      res
        .status(500)
        .json({ status: "error", message: err.message });
    }
  },

  //CREATE A USER
  createUser: async (req: Request, res: Response) => {
    try {
      const user = await userService.createUser(req.body);
      res
        .status(200)
        .json({ status: "success", data: user });
    } 
    catch (err: any) {
      res
        .status(500)
        .json({ status: "error", message: err.message });
    }
  },

  //GET A SPECIFIC USER BY ID
  getUserById: async (req: Request, res: Response) => {
    try {
      const user = await userService.getUserById(req.params.id);
      res
        .status(200)
        .json({ status: "success", data: user });
    } 
    catch (err: any) {
      res
        .status(500)
        .json({ status: "error", message: err.message });
    }
  },

  //UPDATE USER BY ID
  updateUser: async (req: Request, res: Response) => {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res
        .status(200)
        .json({ status: "success", data: user });
    } 
    catch (err: any) {
      res
        .status(500)
        .json({ status: "error", message: err.message });
    }
  },
  //DELETE USER BY ID
  deleteUser: async (req: Request, res: Response) => {
    try {
      const user = await userService.deleteUser(req.params.id);
      res
        .status(200)
        .json({ status: "success", data: user });
    } 
    catch (err: any) {
      res
        .status(500)
        .json({ status: "error", message: err.message });
    }
  },
};
