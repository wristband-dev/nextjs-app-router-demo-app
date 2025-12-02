import { NextRequest, NextResponse } from 'next/server';

import { NO_CACHE_HEADERS } from '@/constants';
import { getRequestSession } from '@/wristband';

/**
 * Session Endpoint
 *
 * Data loaded upon app mount and stored in Wristband's react-client-auth SDK cache.
 * This API is the entrypoint for the React client.
 */
export async function GET(req: NextRequest) {
  const session = await getRequestSession(req);
  const sessionResponse = session.getSessionResponse({ email: session.email });
  return NextResponse.json(sessionResponse, { headers: NO_CACHE_HEADERS });
}
