import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import dbConnect from '@/lib/mongodb';
import Visitor from '@/models/Visitor';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-if-missing'
);

// Helper to check admin
async function isAdmin(req: Request) {
  const token = req.headers.get('cookie')?.split('admin_token=')[1]?.split(';')[0];
  if (!token) return false;
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
}

export async function GET(req: Request) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
  }

  try {
    await dbConnect();
    const visitors = await Visitor.find({}).sort({ lastVisited: -1 }).limit(100);
    return NextResponse.json({ success: true, data: visitors });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
  }

  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      await Visitor.findByIdAndDelete(id);
    } else {
      // Clear all (dangerous, only for Super Admin if we wanted, but let's keep it simple)
      await Visitor.deleteMany({});
    }
    
    return NextResponse.json({ success: true, message: 'Logs updated' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
