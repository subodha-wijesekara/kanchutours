import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import dbConnect from '@/lib/mongodb';
import ContactSubmission from '@/models/ContactSubmission';
import BookingSubmission from '@/models/BookingSubmission';
import User from '@/models/User';
import { sendMail, templates } from '@/lib/mail';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-if-missing'
);

export async function POST(req: Request) {
  try {
    // 1. Auth Check (Server-side)
    const token = req.headers.get('cookie')?.split('admin_token=')[1]?.split(';')[0];
    if (!token) {
      return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);
    await dbConnect();
    const adminUser = await User.findById(payload.id);
    
    if (!adminUser) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
    }

    // 2. Body Parsing
    const { id, type, replyMessage } = await req.json();
    if (!id || !type || !replyMessage) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    // 3. Find and Update
    let submission;
    if (type === 'contact') {
      submission = await ContactSubmission.findById(id);
    } else if (type === 'booking') {
      submission = await BookingSubmission.findById(id);
    }

    if (!submission) {
      return NextResponse.json({ success: false, message: 'Submission not found' }, { status: 404 });
    }

    // 4. Send Email
    const originalMessage = submission.message || submission.interest || 'Your inquiry';
    const emailResult = await sendMail({
      to: submission.email,
      subject: `Re: ${submission.subject || 'Your Booking with Kanchu Tours'}`,
      html: templates.adminReply(submission.name, originalMessage, replyMessage),
    });

    if (!emailResult.success) {
      throw new Error('Failed to send reply email');
    }

    // 5. Save to Database & Mark as Read
    submission.replyMessage = replyMessage;
    submission.repliedAt = new Date();
    submission.status = 'read';
    await submission.save();

    return NextResponse.json({ success: true, message: 'Reply sent successfully' });

  } catch (error: any) {
    console.error('Admin Reply Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
