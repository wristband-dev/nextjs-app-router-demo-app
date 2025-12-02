import type { NextRequest } from 'next/server';

import { getRequestSession, wristbandAuth } from '@/wristband';

/**
 * Logout Endpoint
 */
export async function GET(req: NextRequest) {
  const session = await getRequestSession(req);

  /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
  const logoutResponse = await wristbandAuth.appRouter.logout(req, {
    refreshToken: session.refreshToken,
    tenantCustomDomain: session.tenantCustomDomain,
    tenantName: session.tenantName,
  });

  // Always destroy session.
  return await session.destroyToResponse(logoutResponse);
}
