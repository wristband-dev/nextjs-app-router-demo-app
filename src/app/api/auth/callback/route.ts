import { NextRequest } from 'next/server';

import { APP_HOME_URL } from '@/constants';
import { getRequestSession, wristbandAuth } from '@/wristband';

/**
 * Callback Endpoint
 */
export async function GET(req: NextRequest) {
  /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
  // After the user authenticates, exchange the incoming authorization code for JWTs and also retrieve userinfo.
  const callbackResult = await wristbandAuth.appRouter.callback(req, (request, data) => {
    return data.returnUrl || APP_HOME_URL;
  });
  const { callbackData, reason, response, type } = callbackResult;

  // Certain edge cases may require you to redirect back to the Login Endpoint
  if (type === 'redirect_required') {
    console.debug(reason); // <- Optional debugging info
    return response;
  }

  // Save authentication data into the session
  const session = await getRequestSession(req);
  session.fromCallback(callbackData, { email: callbackData.userinfo.email });

  // Save session and redirect to app
  return await session.saveToResponse(response);
}
