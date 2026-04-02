import { headers } from 'next/headers';
import dbConnect from './mongodb';
import Visitor from '@/models/Visitor';

export async function logVisit() {
  try {
    const headerList = await headers();
    
    // Get IP (handles common proxy headers)
    const ip = 
      headerList.get('x-forwarded-for')?.split(',')[0] || 
      headerList.get('x-real-ip') || 
      'unknown';
      
    const userAgent = headerList.get('user-agent') || 'unknown';

    // Don't track if it's local development (optional, but keep it for clarity for now)
    if (ip === '::1' || ip === '127.0.0.1') {
      // return; // Uncomment to skip local dev tracking
    }

    await dbConnect();
    
    // Upsert (increment count if IP exists, or create new)
    await Visitor.findOneAndUpdate(
      { ip },
      { 
        $set: { userAgent },
        $inc: { count: 1 },
        $setOnInsert: { createdAt: new Date() },
        lastVisited: new Date()
      },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error('Visitor logging failed:', error);
  }
}
