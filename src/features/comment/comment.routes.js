import CommentController from "./comment.controller.js";
import express from "express";

 const commentrouter = express.Router();
 const commentController = new CommentController();

 commentrouter.get("/:postId", (req,res,next)=>{
    commentController.getCommentById(req,res,next)
 });
 commentrouter.post("/:postId", (req,res,next)=>{
    commentController.createComment(req,res,next)
 });
 commentrouter.delete("/:commentId", (req,res,next)=>{
    commentController.deletecomment(req,res,next)
 });
 commentrouter.put("/:commentId", (req,res,next)=>{
    commentController.updatecomment(req,res,next)
 });

 export default commentrouter;
