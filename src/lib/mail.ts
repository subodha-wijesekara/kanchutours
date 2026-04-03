import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_PORT === '465',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

type EmailOptions = {
  to: string;
  subject: string;
  html: string;
};

export async function sendMail({ to, subject, html }: EmailOptions) {
  // Check for environment variables
  const requiredEnvVars = ['EMAIL_SERVER', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASSWORD'];
  const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingEnvVars.length > 0) {
    console.error(`❌ MAIL ERROR: Missing environment variables: ${missingEnvVars.join(', ')}`);
    return { success: false, error: 'Missing configuration' };
  }

  try {
    const info = await transporter.sendMail({
      from: `"Kanchu Tours" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`✅ EMAIL SUCCESS: Sent to ${to}. Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`❌ EMAIL ERROR (Sending to ${to}):`, error);
    return { success: false, error };
  }
}

export const templates = {
  customerConfirmation: (name: string) => `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #ffffff; color: #1a1a1a;">
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="color: #ff385c; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase; font-weight: 900;">Kanchu Tours</h1>
        <p style="text-size-adjust: 100%; border-top: 1px solid #eeeeee; width: 50%; margin: 20px auto 0;"></p>
      </div>
      
      <h2 style="font-size: 28px; font-weight: 900; margin-bottom: 20px; line-height: 1.2; text-transform: uppercase; letter-spacing: -1px;">We received your <span style="color: #ff385c;">Inquiry</span>, ${name}!</h2>
      
      <p style="font-size: 16px; line-height: 1.6; color: #444444; margin-bottom: 30px;">
        Thank you for reaching out to Kanchu Tours. We are thrilled that you're considering Sri Lanka for your next adventure.
      </p>
      
      <div style="background-color: #f8f8f8; padding: 30px; border-left: 4px solid #ff385c; margin-bottom: 30px;">
        <p style="margin: 0; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #888888;">Next Steps</p>
        <p style="margin-top: 10px; font-size: 16px; color: #1a1a1a;">
          Our travel specialists are currently reviewing your request. You should expect a personalized response within the next 24 hours.
        </p>
      </div>
      
      <p style="font-size: 14px; color: #888888; text-align: center; margin-top: 50px;">
        © 2026 Kanchu Tours Sri Lanka. All rights reserved.
      </p>
    </div>
  `,
  
  adminAlert: (details: any) => `
    <div style="font-family: sans-serif; padding: 20px; max-width: 600px; border: 1px solid #eee;">
      <h2 style="color: #ff385c;">New Inquiry Received!</h2>
      <table style="width: 100%; border-collapse: collapse;">
        ${Object.entries(details).map(([key, value]) => `
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px; font-weight: bold; text-transform: capitalize;">${key}</td>
            <td style="padding: 10px;">${value}</td>
          </tr>
        `).join('')}
      </table>
    </div>
  `,

  adminReply: (name: string, originalMessage: string, replyMessage: string) => `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eeeeee; background-color: #ffffff; color: #1a1a1a;">
      <div style="padding: 40px; background-color: #000000; text-align: center;">
        <h1 style="color: #ff385c; margin: 0; font-size: 24px; letter-spacing: 4px; text-transform: uppercase; font-weight: 900;">Kanchu Tours</h1>
        <p style="color: #ffffff; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin-top: 10px; opacity: 0.7;">Official Response</p>
      </div>

      <div style="padding: 40px;">
        <p style="font-size: 16px; color: #888888; margin-bottom: 30px;">Hello ${name},</p>
        
        <p style="font-size: 18px; line-height: 1.6; color: #1a1a1a; margin-bottom: 40px; font-weight: 400;">
          ${replyMessage.replace(/\n/g, '<br />')}
        </p>

        <div style="background-color: #f9f9f9; padding: 25px; border-left: 2px solid #ff385c; margin-bottom: 40px;">
          <p style="margin: 0 0 10px 0; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #888888;">Your Inquiry</p>
          <p style="margin: 0; font-size: 14px; color: #666666; font-style: italic; line-height: 1.5;">
            "${originalMessage}"
          </p>
        </div>

        <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #eeeeee;">
          <p style="margin: 0; font-size: 14px; font-weight: bold; color: #1a1a1a;">The Kanchu Tours Team</p>
          <p style="margin: 5px 0 0 0; font-size: 13px; color: #888888;">Sri Lanka Authentic Travel Experts</p>
        </div>
      </div>

      <div style="padding: 20px; background-color: #f8f8f8; text-align: center;">
        <p style="margin: 0; font-size: 11px; color: #aaaaaa; text-transform: uppercase; letter-spacing: 1px;">
          © 2026 Kanchu Tours Sri Lanka · kanchutours.com
        </p>
      </div>
    </div>
  `,
};
