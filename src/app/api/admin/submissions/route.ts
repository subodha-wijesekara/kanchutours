import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ContactSubmission from '@/models/ContactSubmission';
import BookingSubmission from '@/models/BookingSubmission';

export async function GET() {
  try {
    await dbConnect();
    
    const contactSubmissions = await ContactSubmission.find({}).sort({ createdAt: -1 });
    const bookingSubmissions = await BookingSubmission.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: {
        contacts: contactSubmissions,
        bookings: bookingSubmissions,
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const type = searchParams.get('type');
    
    if (!id || !type) {
      return NextResponse.json({ success: false, message: 'Missing ID or type' }, { status: 400 });
    }
    
    if (type === 'contact') {
      await ContactSubmission.findByIdAndDelete(id);
    } else if (type === 'booking') {
      await BookingSubmission.findByIdAndDelete(id);
    } else {
      return NextResponse.json({ success: false, message: 'Invalid type' }, { status: 400 });
    }
    
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    await dbConnect();
    const { id, type, status } = await req.json();
    
    if (!id || !type || !status) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }
    
    if (type === 'contact') {
      await ContactSubmission.findByIdAndUpdate(id, { status });
    } else if (type === 'booking') {
      await BookingSubmission.findByIdAndUpdate(id, { status });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid type' }, { status: 400 });
    }
    
    return NextResponse.json({ success: true, message: 'Updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
