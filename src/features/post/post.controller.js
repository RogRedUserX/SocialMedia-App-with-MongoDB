import express from "express";
import PostModel from "./post.model.js";
import PostRepository from "./post.repository.js";

export default class PostController {

    constructor(){
        this.postRepository = new PostRepository();
    }

    async createPost(req,res,next){
        try{
            const userId = req.userid;
            const {caption} = req.body;
            const imageUrl = "http://localhost:3000/upload/" + req.file.filename;
            const newPost = new PostModel(caption,userId,imageUrl);
            const result = await this.postRepository.createPost(newPost);
            res.status(201).send(result);
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        }     
    }

    async getUserPost(req,res,next){
        try{
            const userId = req.userid;
            const result = await this.postRepository.getUserPost(userId);
            res.status(200).send(result);
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        }     
    }

    async getAllPost(req,res,next){
        try{
            const result = await this.postRepository.getAllPost();
            res.status(200).send(result);
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        }     
    }

    async getPostById(req,res,next){
        try{
            const userdefinedid = req.params.postId;
            const result = await this.postRepository.getPostById(userdefinedid);
            res.status(200).send(result);
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        }     
    }

    async updatePost(req,res,next){
        try{
            const userId = req.userid;
            const id = req.params.postId;
            const {caption} = req.body;
            const imageUrl = "http://localhost:3000/upload/" + req.file.filename;
            const newUpdate = new PostModel(caption,userId,imageUrl);
            const result = await this.postRepository.updatePost(newUpdate,userId,id);
            res.status(200).send(result);
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        }     
    }

    async deletePost(req,res,next){
        try{
            const userId = req.userid;
            const id = req.params.postId;
            const result = await this.postRepository.deletePost(userId,id,next);
            res.status(200).send(result);
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        }     
    }
}
