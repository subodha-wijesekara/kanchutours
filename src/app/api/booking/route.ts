import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BookingSubmission from '@/models/BookingSubmission';
import { sendMail, templates } from '@/lib/mail';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    
    const submission = await BookingSubmission.create(data);
    
    // Trigger Auto-Emails (Non-blocking)
    const adminEmail = 'wijesekararsc@gmail.com';
    
    // 1. Send confirmation to Traveler
    sendMail({
      to: data.email,
      subject: 'Adventure Awaits! Booking Inquiry Received - Kanchu Tours',
      html: templates.customerConfirmation(data.name),
    });

    // 2. Send Alert to Admin
    sendMail({
      to: adminEmail,
      subject: `New Booking Inquiry: ${data.interest} from ${data.name}`,
      html: templates.adminAlert(data),
    });
    
    return NextResponse.json({ success: true, id: submission._id });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
