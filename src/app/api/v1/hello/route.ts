import { NextResponse } from 'next/server';

import { getSession } from '@/session/iron-session';

export async function GET() {
  const session = await getSession();
  const { isAuthenticated } = session;

  /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
  if (!isAuthenticated) {
    return new NextResponse(null, { status: 401 });
  }

  return NextResponse.json({ message: 'Hello, World!' });
}
