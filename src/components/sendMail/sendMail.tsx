'use server'
import nodemailer from 'nodemailer';
const SMTP_SERVER_HOST = process.env.NEXT_PUBLIC_SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.NEXT_PUBLIC_SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.NEXT_PUBLIC_SMTP_SERVER_PASSWORD;
const SITE_MAIL_SENDER = process.env.NEXT_PUBLIC_SITE_MAIL_SENDER;
const SITE_MAIL_RECIEVER = process.env.NEXT_PUBLIC_SITE_MAIL_RECIEVER;

const transporter = nodemailer.createTransport({
  host: SMTP_SERVER_HOST,
  port: 465,
  secure: true,
  auth: {
      user: SMTP_SERVER_USERNAME,
      pass: SMTP_SERVER_PASSWORD,
    },
});
    
export async function sendMail(subject:string, html?:string){
    
  try {
    const isVerified = await transporter.verify();
  } catch (error) {
    console.error('Something Went Wrong');
  }

  const info = await transporter.sendMail({
    subject: subject,
    from: SITE_MAIL_SENDER,
    to: SITE_MAIL_RECIEVER,
    text: "Solicitação de suporte",
    html: html ? html : '',
    cc: "Admmpsolucoes01@gmail.com"
  });

  return info.messageId;

}