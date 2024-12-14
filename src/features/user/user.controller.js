import express from "express";
import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import { ApplicationError } from "../../middleware/applicationerror.middleware.js";

export default class UserController{

    constructor(){
        this.userRepository = new UserRepository();
    }

    async getAll(req,res,next){
        try{
            const result = await this.userRepository.getAll();
            res.status(200).send(result);
        }catch(err){
            next(err);
        }    
    }

    async get(req,res,next){
        try{
            const id = req.params.userId;
            const result = await this.userRepository.get(id);
            res.status(200).send(result);
        }catch(err){
            next(err);
        }
    }

    async registration(req,res,next){
        try{
            const {name,email,password,gender} = req.body;
            const newUser = new UserModel(name,email,password,gender);
            const result = await this.userRepository.registration(newUser);
            res.status(201).send(result);
        }catch(err){
            console.log(err);
            next(err);
        }     
    }

    async login(req,res,next){
        try{
            const {email,password} = req.body; 
            const result = await this.userRepository.login(email,password);
            if(result){
                const token = jwt.sign(
                {    
                    userid:result._id.toString(),
                    email:result.email,
                },
                "uj_IPlp^A{x%qy$",
                { expiresIn: "1h" }
                );
                result.token = token;
                res.status(200).cookie("jwtToken",token, {maxAge: 900000, httpOnly:false}).send(result);
            }  
        }catch(err){
            next(err);
        }       
    }

    async logout(req,res,next){
        try{
            const userid = req.userid;
            if(!userid){
                throw new ApplicationError("Login first to logout", 400);
            }
            res.clearCookie("jwtToken");
            res.status(200).send("Logout Successfully");
        }catch(err){
            console.log(err);
            next(err);
        } 
    }

    async update(req,res,next){
        try{
            const userDefinedId = req.params.userId;
            const userId = req.userid;
            if(!userId){
                throw new ApplicationError("Login first to update", 400);
            }
            if(userDefinedId != userId){
                throw new ApplicationError("unauthorized", 401);
            }
            const {name,email,password,gender} = req.body;
            const newUpdate = new UserModel(name,email,password,gender);
            const result = await this.userRepository.update(newUpdate,userDefinedId,next);
            res.status(200).send(result);
        }catch(err){
            console.log(err)
            next(err);
        } 
    }
}
