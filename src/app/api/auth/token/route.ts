import { NextRequest, NextResponse } from 'next/server';

import { NO_CACHE_HEADERS } from '@/constants';
import { getRequestSession } from '@/wristband';

/**
 * Token Endpoint
 *
 * Retrieves an access token and its expiration time to store in Wristband's react-client-auth SDK.
 * Calling Wrisband's React SDK getToken() function calls this endpoint when there is no access token
 * present in the React SDK client-side cache.
 */
export async function GET(req: NextRequest) {
  const session = await getRequestSession(req);
  const tokenResponse = session.getTokenResponse();
  return NextResponse.json(tokenResponse, { headers: NO_CACHE_HEADERS });
}
