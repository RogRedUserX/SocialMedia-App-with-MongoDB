import LikeController from "./like.controller.js";
import express from "express";

const likerouter = express.Router();
const likeController = new LikeController();

likerouter.get("/:id", (req,res,next)=>{
    likeController.getAllLikes(req,res,next)
});
likerouter.get("/toggle/:id", (req,res,next)=>{
    likeController.togglelike(req,res,next)
});
likerouter.get("/counts/:id", (req,res,next)=>{
    likeController.getCounts(req,res,next)
});

export default likerouter; 
