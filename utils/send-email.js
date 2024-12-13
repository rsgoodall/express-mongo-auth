const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailer-config');

const sendEmail = async({to,subject,html}) => {
    let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport(nodemailerConfig);

    return transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html,
    });
}

module.exports = sendEmail;