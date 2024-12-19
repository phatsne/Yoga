const nodemailer = require('nodemailer');
require('dotenv').config();

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,  // Cổng SMTP cho Gmail
            secure: false,  // false vì đang dùng cổng 587
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const info = await transporter.sendMail({
            from: 'StudyNotion || by Aniruddha Gade',
            to: email,
            subject: title,
            html: body
        });

        return info;
    } catch (error) {
        console.error('Error while sending mail: ', error);
    }
}

module.exports = mailSender;
