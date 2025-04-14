const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASSWORD, FRONTEND_URL } = require('../config/dotenv');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
    }
});

const sendMail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: EMAIL_USER,
            to,
            subject,
            html
        };
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error(error);
    }
}

const sendMailRecoveryPassword = async (to, token) => {
    try {
        const subject = 'Recuperación de contraseña';
        const html = `
            <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
            <h1 style="color: #4CAF50;">Recuperación de contraseña</h1>
            <p style="font-size: 16px;">Para recuperar tu contraseña, haz click en el siguiente enlace:</p>
            <a href="${FRONTEND_URL}/reset-password/${token}" style="display: inline-block; padding: 10px 20px; margin-top: 20px; font-size: 16px; color: #fff; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">Recuperar contraseña</a>
            <p style="margin-top: 20px; font-size: 14px; color: #777;">Si no solicitaste este cambio, puedes ignorar este correo.</p>
            </div>
        `;
        await sendMail(to, subject, html);
    } catch (error) {
        console.error(error)
    }
}


module.exports = {sendMail, sendMailRecoveryPassword};