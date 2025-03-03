import { APP_STRINGS } from "@/app/common/magic-strings";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: APP_STRINGS.NODEMAILER.SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const mailOptions = (
  destination: string,
  subject: string,
  html: string
) => {
  return {
    from: process.env.EMAIL_USER,
    to: destination,
    subject,
    html,
  };
};
