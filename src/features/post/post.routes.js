import express from "express";
import PostController from "./post.controller.js";



const postrouter = express.Router();
const postController = new PostController();

postrouter.post("/", (req,res,next)=>{
    postController.createPost(req,res,next)
});
postrouter.get("/", (req,res,next)=>{
    postController.getUserPost(req,res,next)
});
postrouter.get("/all", (req,res,next)=>{
    postController.getAllPost(req,res,next)
});
postrouter.get("/:postId", (req,res,next)=>{
    postController.getPostById(req,res,next)
});
postrouter.put("/:postId", (req,res,next)=>{
    postController.updatePost(req,res,next)
});
postrouter.delete("/:postId", (req,res,next)=>{
    postController.deletePost(req,res,next)
});

export default postrouter;