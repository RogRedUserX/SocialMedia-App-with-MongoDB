import { ApplicationError } from "../../middleware/applicationerror.middleware.js";
import { ObjectId } from "mongodb";

export default class LikeModel{
    constructor(userId,type,id){
        this.userId = ObjectId.createFromHexString(userId);
        this.type = type;
        this.id = ObjectId.createFromHexString(id);
    }
}