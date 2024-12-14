import nodeMailer from "nodemailer";

const sendMail = async(mail,otp,next) => {
    const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth:{
            user: "codingninjas2k16@gmail.com",
            pass: "slwvvlczduktvhdj",
        },
    });

    const mailOptions = {
        from:"codingninjas2k16@gmail.com",
        to:mail,
        subject:"Rest Password Otp",
        text:`Your rest password otp for socialMedia app is ${otp}` 
    }

    try{
        const result = await transporter.sendMail(mailOptions);
    }catch(err){
        console.log(err);
        next(err);
    }
} 

export default sendMail;