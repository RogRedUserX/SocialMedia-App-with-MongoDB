import jwt from "jsonwebtoken";

const jwtAuth = (req,res,next) => {
    try{
        const {jwtToken} = req.cookies;
        const authStatus = jwt.verify(jwtToken, "uj_IPlp^A{x%qy$");
        req.userid = authStatus.userid;
        next();
    }catch{
        res.status(401).send("unauthorized");
    }
}

export default jwtAuth;