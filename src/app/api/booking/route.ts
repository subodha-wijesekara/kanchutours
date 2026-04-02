import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BookingSubmission from '@/models/BookingSubmission';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    
    const submission = await BookingSubmission.create(data);
    
    return NextResponse.json({ success: true, id: submission._id });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
