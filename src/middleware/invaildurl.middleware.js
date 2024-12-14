import express from "express";

export const invaildRoutesHandlerMiddleware = (req,res,next) => {
    res.status(404).send("API not found, For more help look at the api-doc");
    next();
}
