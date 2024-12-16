import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

import { getSession } from '@/session/iron-session';
import { CSRF_TOKEN_COOKIE_NAME, SESSION_COOKIE_NAME } from '@/utils/constants';
import { wristbandAuth } from '@/wristband-auth';

export async function GET(req: NextRequest) {
  const session = await getSession();
  const { refreshToken, tenantCustomDomain, tenantDomainName } = session;

  // Always destroy session and CSRF cookies.
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  cookieStore.delete(CSRF_TOKEN_COOKIE_NAME);
  session.destroy();

  /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
  return await wristbandAuth.appRouter.logout(req, { refreshToken, tenantCustomDomain, tenantDomainName });
}
