import nodemailer from "nodemailer";
import { env } from "./env";

// Create transporter — only active if SMTP credentials are provided
export const transporter = nodemailer.createTransport({
  host: env.smtp.host,
  port: env.smtp.port,
  secure: env.smtp.port === 465,
  auth:
    env.smtp.user && env.smtp.password
      ? { user: env.smtp.user, pass: env.smtp.password }
      : undefined,
});

export async function sendMail(options: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}): Promise<boolean> {
  if (!env.smtp.user || !env.smtp.password) {
    // Log email in dev when SMTP is not configured
    if (env.isDev) {
      console.log(`\n📧 [DEV EMAIL] To: ${options.to}\nSubject: ${options.subject}\n${options.text ?? ""}\n`);
    }
    return true;
  }

  try {
    await transporter.sendMail({
      from: env.smtp.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}
