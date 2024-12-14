import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../middleware/applicationerror.middleware.js";
import PostRepository from "../post/post.repository.js";
import { ObjectId } from "mongodb";

export default class CommentRepository{
    constructor(){
        this.collection = "comments"
    }
    // constructor(){
    //     this.postRepository = new PostRepository();
    // }

    async createComment(newComment,next){
        try{
            const {postId} = newComment;
            const db = getDB();
            const collection = db.collection(this.collection);
            // const isPost = await this.postRepository.getAllPost({_id:ObjectId(postId)});
            // if(!isPost){
            //     throw new ApplicationError("No post available for this Id", 404);
            // }
            // const isComment = await this.postRepository.getAllPost({_id:ObjectId(postId)});
            // if(!isComment){
            //     throw new ApplicationError("No comment available for this Id", 404);
            // }
            const result = await collection.insertOne(newComment);
            return result;
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        }     
    }

    async getCommentById(postId,next){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.find({postId:ObjectId.createFromHexString(postId)}).toArray();
            if(!result){
                throw new ApplicationError("There is no comment available for this Id", 404);
            }
            return result;
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        }     
    }

    async updatecomment(commentId,userId,content,next){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.updateOne({_id:ObjectId.createFromHexString(commentId),userId:ObjectId.createFromHexString(userId)},{$set:{content:content}});
            if(!result){
                throw new ApplicationError("unauthorized", 401);
            }
            return result;
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        } 
    }

    async deletecomment(commentId,userId,next){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.deleteOne({_id:ObjectId.createFromHexString(commentId),userId:ObjectId.createFromHexString(userId)});
            if(result.deletedCount == 1){
                return "Post deleted successfully";
            }else{
                throw new ApplicationError("unauthorized", 401);
            }
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        } 
    }
}