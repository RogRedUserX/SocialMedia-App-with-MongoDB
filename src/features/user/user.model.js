import { ApplicationError } from "../../middleware/applicationerror.middleware.js";

export default class UserModel{
    constructor(name,email,password,gender){
        this.name = name;
        this.email = email;
        this.password = password;
        this.gender = gender;
    }
}