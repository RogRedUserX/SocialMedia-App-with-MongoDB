import { ApplicationError } from "../../middleware/applicationerror.middleware.js";
import { ObjectId } from "mongodb";
export default class PostModel{
    constructor(caption,userId,imageUrl){
        this.caption = caption;
        this.userId = ObjectId.createFromHexString(userId);
        this.imageUrl = imageUrl;
    }
}