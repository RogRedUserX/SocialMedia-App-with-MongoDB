import { ApplicationError } from "../../middleware/applicationerror.middleware.js";
import LikeModel from "./like.model.js";
import LikeRepository from "./like.repository.js";

export default class LikeController{

    constructor(){
        this.likeRepository = new LikeRepository();
    }

    async togglelike(req,res,next){
        try{
            const id = req.params.id;
            const userId = req.userid;
            const {type} = req.query;
            if(type != "comment" && type != "post"){
                throw new ApplicationError("Type has to be comment or post", 400);
            }
            const data = new LikeModel(userId,type,id);
            const result = await this.likeRepository.togglelike(data,id,userId,next);
            res.status(200).send(result);
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        } 
    }

    async getAllLikes(req,res,next){
        try{
            const id = req.params.id;
            const result = await this.likeRepository.getLikes(id,next);
            res.status(200).send(result);
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        } 
    }

    async getCounts(req,res,next){
        try{
            const id = req.params.id;
            const result = await this.likeRepository.getCounts(id,next);
            res.status(200).json({"Count":result});
        }catch(err){
            // throw new Error("something went wrong");
            console.log(err);
            next(err);
        } 
    }
}
