import express from "express";
import UserController from "./user.controller.js";
import jwtAuth from "../../middleware/jwt.middleware.js";

const userroutes = express.Router();
const userController = new UserController();

userroutes.post("/signup", (req,res,next)=>{
    userController.registration(req,res,next)
});
userroutes.post("/signin", (req,res,next)=>{
    userController.login(req,res,next)
});
userroutes.get("/logout", jwtAuth,(req,res,next)=>{
    userController.logout(req,res,next)
});
userroutes.get("/get-details/:userId", (req,res,next)=>{
    userController.get(req,res,next)
});
userroutes.get("/get-all-details", (req,res,next)=>{
    userController.getAll(req,res,next)
});
userroutes.put("/update-details/:userId", jwtAuth ,(req,res,next)=>{
    userController.update(req,res,next)
});


export default userroutes;
