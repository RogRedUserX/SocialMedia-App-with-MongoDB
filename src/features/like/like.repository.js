import { getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
import PostRepository from "../post/post.repository.js";

const postRepository = new PostRepository();

export default class LikeRepository{
    constructor(){
        this.collection = "likes"
    }

    async togglelike(data,id,userId,next){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            // const isPost = await postRepository.getAllPost({_id:ObjectId(postId)});
            // if(!isPost){
            //     throw new ApplicationError("No post available for this Id", 404);
            // }
            // const isComment = await postRepository.getAllPost({_id:ObjectId(postId)});
            // if(!isComment){
            //     throw new ApplicationError("No comment available for this Id", 404);
            // }
            const isLike = await collection.findOne({id:ObjectId.createFromHexString(id),userId:ObjectId.createFromHexString(userId)});
            if(isLike){
                const result = await collection.deleteOne({id:ObjectId.createFromHexString(id),userId:ObjectId.createFromHexString(userId)});
                return "Removed Like successfully";
            }else{
                const result = await collection.insertOne(data);
                return "Liked successfully";
            }    
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        } 
    }

    async getLikes(id,next){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.find({id:ObjectId.createFromHexString(id)}).toArray();
            return result;
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        } 
    }

    async getCounts(id,next){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.countDocuments({id:ObjectId.createFromHexString(id)});
            return result;
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        } 
    }
}