import OtpModel from "./otp.model.js";
import OtpRepository from "./otp.repository.js";


export default class OtpController{
    constructor(){
        this.otpRepository = new OtpRepository();
    }

    async sendOtp(req,res,next){
        try{
            const{email} = req.body;
            const result = await this.otpRepository.sendOtp(email,next);
            res.status(200).send("otp send to email successfully");
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        }
    }

    async verifyOtp(req,res,next){
        try{
            const{email,otp} = req.body;
            const result = await this.otpRepository.verifyOtp(email,otp,next);
            res.status(200).send(result);
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        }
    }

    async restPassword(req,res,next){
        try{
            const{email,otp,newPassword} = req.body;
            const result = await this.otpRepository.restPassword(email,otp,newPassword,next);
            res.status(200).send(result);
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        }
    }
}
