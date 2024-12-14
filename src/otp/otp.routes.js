import OtpController from "./otp.controller.js";
import express from "express";

const otproutes = express.Router();
const otpController = new OtpController();

otproutes.post("/send", (req,res,next)=>{
    otpController.sendOtp(req,res,next)
});
otproutes.post("/verify", (req,res,next)=>{
    otpController.verifyOtp(req,res,next)
});
otproutes.put("/rest-password", (req,res,next)=>{
    otpController.restPassword(req,res,next)
});

export default otproutes;