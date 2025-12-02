import { NextRequest } from 'next/server';

import { APP_HOME_URL } from '@/constants';
import { getRequestSession, wristbandAuth } from '@/wristband';

/**
 * Callback Endpoint
 */
export async function GET(req: NextRequest) {
  /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
  // After the user authenticates, exchange the incoming authorization code for JWTs and also retrieve userinfo.
  const callbackResult = await wristbandAuth.appRouter.callback(req);
  const { callbackData, redirectUrl, type } = callbackResult;

  if (type === 'redirect_required') {
    return await wristbandAuth.appRouter.createCallbackResponse(req, redirectUrl);
  }

  // Save authentication data into the session
  const session = await getRequestSession(req);
  session.fromCallback(callbackData, { email: callbackData.userinfo.email });

  // Create the response that will send the user back to the application.
  const appUrl = callbackData.returnUrl || APP_HOME_URL;
  const callbackResponse = await wristbandAuth.appRouter.createCallbackResponse(req, appUrl);

  // Save session and redirect to app
  return await session.saveToResponse(callbackResponse);
}
