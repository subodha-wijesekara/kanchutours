import { NextResponse, after } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ContactSubmission from '@/models/ContactSubmission';
import { sendMail, templates } from '@/lib/mail';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    
    const submission = await ContactSubmission.create(data);
    
    // Trigger Auto-Emails (Using `after` to ensure they finish on Vercel)
    const adminEmail = 'wijesekararsc@gmail.com';
    
    after(async () => {
      // 1. Send confirmation to Customer
      await sendMail({
        to: data.email,
        subject: 'Thank you for contacting Kanchu Tours!',
        html: templates.customerConfirmation(data.name),
      });

      // 2. Send Alert to Admin
      await sendMail({
        to: adminEmail,
        subject: `New Inquiry from ${data.name}: ${data.subject}`,
        html: templates.adminAlert(data),
      });
    });
    
    return NextResponse.json({ success: true, id: submission._id });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
