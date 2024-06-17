import type { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { getSession } from '@/session/iron-session';
import { SESSION_COOKIE_NAME } from '@/utils/constants';
import { logout } from '@/auth/server-auth';

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getSession();
  const { tenantDomainName, refreshToken } = session;

  // Always destroy session.
  cookies().delete(SESSION_COOKIE_NAME)
  session.destroy();

  try {
    /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
    return await logout(req, res, { tenantDomainName, refreshToken });
  } catch (error: unknown) {
    console.error(error);
  }
}
