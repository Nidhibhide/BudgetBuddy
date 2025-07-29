"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailOptionsForVResetPass = exports.transporterFun = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporterFun = () => {
    return nodemailer_1.default.createTransport({
        host: process.env.HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    });
};
exports.transporterFun = transporterFun;
const mailOptionsForVResetPass = (email, token) => {
    const CLIENT = process.env.CLIENT;
    const resetUrl = `${CLIENT}/resetPass?token=${token}`;
    const mailOptions = {
        from: process.env.USER,
        to: email,
        subject: "Reset Your Password",
        text: `You're receiving this email from Learncode to reset your password.

Click the link below to proceed:
${resetUrl}

This link will expire in 5 minutes. If you didn't request this, you can ignore it.`,
        html: `
    <div style="font-family: Arial, sans-serif;">
      <p><strong>Learncode Password Reset</strong></p>
      <p>Click the button below to reset your password:</p>
      <a href="${resetUrl}" style="padding: 10px 16px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">Reset Password</a>
      <p>This link will expire in 5 minutes. If you didn’t request this, please ignore it.</p>
    </div>
  `,
    };
    return mailOptions;
};
exports.mailOptionsForVResetPass = mailOptionsForVResetPass;
//# sourceMappingURL=sendEmailFun.js.map