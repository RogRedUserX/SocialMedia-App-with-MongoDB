import PostModel from "../post/post.model.js";
import { ApplicationError } from "../../middleware/applicationerror.middleware.js"; 
import { ObjectId } from "mongodb";
export default class CommentModel{
    constructor(content,userId,postId){
        this.content = content;
        this.userId = ObjectId.createFromHexString(userId);
        this.postId = ObjectId.createFromHexString(postId);
    }
}