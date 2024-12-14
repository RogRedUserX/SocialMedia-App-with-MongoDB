import OtpModel from "./otp.model.js";
import { getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
import UserRepository from "../user/user.repository.js";
import otpGenerator from "otp-generator";
import { ApplicationError } from "../../middleware/applicationerror.middleware.js";
import sendMail from "../../middleware/email.middleware.js";

const userRepository = new UserRepository();

export default class OtpRepository{
    constructor(){
        this.collection = "otp"
    }

    async sendOtp(email,next){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await userRepository.findByEmail(email,next);
            if(result){
                const actualOtp = otpGenerator.generate(6,{digits:true,specialChars:false});
                await collection.insertOne({email:email,otp:actualOtp});
                await sendMail(email,actualOtp,next);
                return actualOtp;
            }
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        }
    }

    async verifyOtp(email,otp,next){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.findOne({email:email,otp:otp});
            if(!result){
                throw new ApplicationError("otp wrong", 401);
            }
            return "otp verified successfully";
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        }
    }

    async restPassword(email,otp,newPassword,next){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.findOne({email:email,otp:otp});
            if(!result){
                throw new ApplicationError("unauthorized", 401);
            }
            await userRepository.updatePassword(email,newPassword,next);
            await collection.deleteOne({email:email,otp:otp});
            return "password rest successfully";
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        }
    }
}