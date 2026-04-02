import { NextResponse } from 'next/server';
import { logVisit } from '@/lib/tracker';

export async function POST() {
  try {
    // Calls the existing tracker securely on the server
    await logVisit();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
