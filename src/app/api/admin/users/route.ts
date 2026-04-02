import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
// @ts-ignore
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-if-missing'
);

// Helper to check superadmin
async function isSuperAdmin(req: Request) {
  const token = req.headers.get('cookie')?.split('admin_token=')[1]?.split(';')[0];
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload.role === 'superadmin';
  } catch (error) {
    return false;
  }
}

export async function GET(req: Request) {
  if (!(await isSuperAdmin(req))) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
  }

  try {
    await dbConnect();
    const users = await User.find({}).sort({ createdAt: -1 }).select('-password');
    return NextResponse.json({ success: true, data: users });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  if (!(await isSuperAdmin(req))) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
  }

  try {
    await dbConnect();
    const { id, action, value } = await req.json();

    if (!id || !action || !value) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    const update: any = {};
    if (action === 'status') update.status = value;
    if (action === 'role') update.role = value;
    if (action === 'password') {
      update.password = await bcrypt.hash(value, 12);
    }

    const user = await User.findByIdAndUpdate(id, update, { new: true });
    
    return NextResponse.json({ success: true, data: user });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!(await isSuperAdmin(req))) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
  }

  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Missing ID' }, { status: 400 });
    }

    await User.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'User deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
