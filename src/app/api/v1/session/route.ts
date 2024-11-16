import { NextResponse } from 'next/server';

import { getSession } from '@/session/iron-session';
import { HTTP_401_STATUS, UNAUTHORIZED } from '@/utils/constants';

export async function GET() {
  const session = await getSession();
  const { isAuthenticated, tenantDomainName, user } = session;

  /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
  if (!isAuthenticated) {
    return NextResponse.json(UNAUTHORIZED, HTTP_401_STATUS);
  }

  return NextResponse.json({ user, tenantDomainName });
}
