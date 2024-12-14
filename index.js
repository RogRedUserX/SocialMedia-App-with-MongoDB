// External Imported Packages
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import swagger from "swagger-ui-express";

// Internal Imported Packages
import userroutes from "./src/features/user/user.routes.js";
import postrouter from "./src/features/post/post.routes.js";
import commentrouter from "./src/features/comment/comment.routes.js";
import likerouter from "./src/features/like/like.routes.js";
import otproutes from "./src/features/otp/otp.routes.js";
import {ApplicationErrorMiddleware} from "./src/middleware/applicationerror.middleware.js";
import uploadFile from "./src/middleware/file-upload.middleware.js";
import jwtAuth from "./src/middleware/jwt.middleware.js";
import loggerMiddleware from "./src/middleware/logger.middleware.js";
import { invaildRoutesHandlerMiddleware } from "./src/middleware/invaildurl.middleware.js";
import apiDocs from "./swagger.json" assert {type:"json"};
import { connectToMongoDB } from "./src/config/mongodb.js";

// Creating express server
const app = express();

// Using Middlewares fors cross origin resource shearing, multer for file upload, body parser and cookie parser 
app.use(cors());
app.use("/upload", express.static("upload"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

// All Routes
app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
app.use("/api/users", userroutes);
app.use("/api/posts", jwtAuth,uploadFile.single("imageUrl"),loggerMiddleware, postrouter);
app.use("/api/comments", jwtAuth, loggerMiddleware, commentrouter);
app.use("/api/likes", jwtAuth, loggerMiddleware, likerouter);
app.use("/api/otp", otproutes);

// Middleware for invaild api and handling application level Errors
app.use(invaildRoutesHandlerMiddleware);
app.use(ApplicationErrorMiddleware);


// Server port
app.listen(3000,()=>{
    console.log("server is listen on port 3000")
    connectToMongoDB();
})