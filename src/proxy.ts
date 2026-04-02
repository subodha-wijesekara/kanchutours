import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-if-missing'
);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Paths that don't require authentication
  if (
    pathname.startsWith('/admin/login') ||
    pathname.startsWith('/admin/register') ||
    !pathname.startsWith('/admin')
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get('admin_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
}

// Config to limit execution to specific paths
export const config = {
  matcher: ['/admin/:path*'],
};
