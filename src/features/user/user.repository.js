import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../middleware/applicationerror.middleware.js";

export default class UserRepository {

    constructor(){
        this.collection = "users";
    }

    async getAll(next){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.find({}, {projection:{ password: 0 }}).toArray();
            return result;
        }catch(err){
            next(err);
        }   
    }

    async get(id,next){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.findOne({_id:ObjectId.createFromHexString(id)}, {password:0});
            if(!result){
                throw new ApplicationError("invalid credentials", 401);
            }
            const insertDocument = result;
            delete insertDocument.password;
            return insertDocument; 
        }catch(err){
            throw new ApplicationError("No user found",404);
            // next(err);
        }   
    }

    async registration(newUser,next){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.insertOne(newUser);
            const insertDocument = result;
            delete insertDocument.password;
            return insertDocument; 
        }catch(err){
            console.log(err);
            // throw new Error("something went wrong");
            next(err);
        }    
    }

    async login(email, password,next){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const isFound = await collection.findOne({email:email, password:password});
            if(!isFound){
                throw new ApplicationError("invalid credentials", 401);
            }
            const insertDocument = isFound;
            delete insertDocument.password;
            return insertDocument;
        }catch(err){
            // throw new Error("something went wrong");
            next(err);
        }     
    }

    async update(newUpdate,userId,next){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.replaceOne({_id:ObjectId.createFromHexString(userId)},newUpdate);
            return result;
        }catch(err){
            // throw new Error("something went wrong");
            next(err);
        }     
    }

    async findByEmail(email,next){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.findOne({email:email});
            const insertDocument = result
            delete insertDocument.password;
            return insertDocument;
        }catch(err){
            throw new ApplicationError("There is no user for this email",404);
        }
    }

    async updatePassword(email,newPassword,next){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.updateOne({email:email},{$set:{password:newPassword}});
            const insertDocument = result;
            // delete insertDocument.password;
            return insertDocument;
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        }
    }

}