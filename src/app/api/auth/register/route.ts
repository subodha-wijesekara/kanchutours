import { NextResponse } from 'next/server';
// @ts-ignore
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

const SUPER_ADMIN_EMAIL = 'wijesekararsc@gmail.com';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return NextResponse.json({ success: false, message: 'User already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Initial role/status logic
    const isSuperAdmin = email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
    
    const user = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      role: isSuperAdmin ? 'superadmin' : 'admin',
      status: isSuperAdmin ? 'approved' : 'pending',
    });

    return NextResponse.json({ 
      success: true, 
      message: isSuperAdmin ? 'Super Admin created and approved' : 'Registration successful, awaiting approval' 
    });
  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
