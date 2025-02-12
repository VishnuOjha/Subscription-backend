import nodemailer from 'nodemailer';
import { ACCESS_TOKEN, CLIENT_ID, CLIENT_SECRET, EMAIL_USER, REFRESH_TOKEN } from './env.js';

export const createTransporter = async () => {

  // Create transporter with explicit Gmail settings
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    service: "gmail",
    auth: {
      type: 'OAuth2',
      user: EMAIL_USER,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: ACCESS_TOKEN,
  },
  tls: {
    rejectUnauthorized: false, // Allow for self-signed certificates (optional)
  },
    // Debug settings (remove in production)
    debug: true,
    logger: true
  });

  return transporter;

}


