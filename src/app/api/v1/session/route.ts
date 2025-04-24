import { NextResponse } from 'next/server';

import { getSession } from '@/session/iron-session';

export async function GET() {
  const session = await getSession();
  const { user } = session;
  const { id, email, tenantId } = user;

  return NextResponse.json({ userId: id, tenantId, metadata: { email } });
}
