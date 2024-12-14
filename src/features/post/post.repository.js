import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../middleware/applicationerror.middleware.js";
import { ObjectId } from "mongodb";

export default class PostRepository{
    constructor(){
        this.collection = "posts"
    }

    async createPost(newPost,next){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.insertOne(newPost);
            return result;
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        }     
    }

    async getUserPost(userId,next){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.find({userId:ObjectId.createFromHexString(userId)}).toArray();
            if(!result){
                throw new ApplicationError("There is no post available", 404);
            }
            return result;
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        }
    }

    async getAllPost(next){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.find().toArray();
            if(!result){
                throw new ApplicationError("There is no post available", 404);
            }
            return result;
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        }     
    }

    async updatePost(newUpdate,userId,id,next){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.replaceOne({userId:ObjectId.createFromHexString(userId),_id:ObjectId.createFromHexString(id)},newUpdate);
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

    async deletePost(userId,id,next){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.deleteOne({userId:ObjectId.createFromHexString(userId),_id:ObjectId.createFromHexString(id)});
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

    async getPostById(userdefinedid,next){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = collection.find({_id:ObjectId.createFromHexString(userdefinedid)}).toArray();
            if(!result){
                throw new ApplicationError("There is no post available for this id", 404);
            }
            return result;
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        } 
    }
}