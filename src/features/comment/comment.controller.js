import CommentModel from "./comment.model.js";
import CommentRepository from "./comment.repository.js";


export default class CommentController{

    constructor(){
        this.commentRepository = new CommentRepository();
    }

    async createComment(req,res,next){
        try{
            const userId = req.userid;
            const postId = req.params.postId;
            const {content} = req.body;
            const newComment = new CommentModel(content,userId,postId);
            const result = await this.commentRepository.createComment(newComment,next);
            res.status(201).send(result);
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        }     
    }

    async getCommentById(req,res,next){
        try{
            const postId = req.params.postId;
            const result = await this.commentRepository.getCommentById(postId,next);
            res.status(200).send(result);
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        } 
    }

    async updatecomment(req,res,next){
        try{
            const commentId = req.params.commentId;
            const userId = req.userid;
            const {content} = req.body;
            const result = await this.commentRepository.updatecomment(commentId,userId,content,next);
            res.status(200).send(result);
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        }     
    }

    async deletecomment(req,res,next){
        try{
            const commentId = req.params.commentId;
            const userId = req.userid;
            const result = await this.commentRepository.deletecomment(commentId,userId,next);
            res.status(200).send(result);
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        }     
    }
}
