const nodemailer = require("nodemailer");

const mailSender = async (email,title, body) => {
    try{
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })

    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = mailSender;