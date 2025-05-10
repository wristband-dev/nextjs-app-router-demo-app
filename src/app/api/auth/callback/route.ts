import { NextRequest } from 'next/server';
import { CallbackResult, CallbackResultType } from '@wristband/nextjs-auth';

import { getSession } from '@/session/iron-session';
import { parseUserinfo } from '@/utils/helpers';
import { INVOTASTIC_HOST } from '@/utils/constants';
import { wristbandAuth } from '@/wristband-auth';
import { Userinfo } from '@/types/wristband-types';
import { createCsrfSecret, setCsrfTokenCookie } from '@/utils/csrf';

export async function GET(req: NextRequest) {
  /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
  // After the user authenticates, exchange the incoming authorization code for JWTs and also retrieve userinfo.
  const callbackResult: CallbackResult = await wristbandAuth.appRouter.callback(req);
  const { callbackData, redirectUrl, type } = callbackResult;

  if (type === CallbackResultType.REDIRECT_REQUIRED) {
    return await wristbandAuth.appRouter.createCallbackResponse(req, redirectUrl!);
  }

  const session = await getSession();

  // Save any necessary fields for the user's app session into a session cookie.
  session.isAuthenticated = true;
  session.accessToken = callbackData!.accessToken;
  // Convert the "expiresIn" seconds into an expiration date with the format of milliseconds from the epoch.
  session.expiresAt = Date.now() + callbackData!.expiresIn * 1000;
  session.refreshToken = callbackData!.refreshToken;
  session.user = parseUserinfo(callbackData!.userinfo as Userinfo);
  session.tenantDomainName = callbackData!.tenantDomainName;
  session.tenantCustomDomain = callbackData!.tenantCustomDomain || undefined;

  // Create the response that will send the user back to the Invotastic application.
  const appUrl = callbackData!.returnUrl || `http://${INVOTASTIC_HOST}`;
  const callbackResponse = await wristbandAuth.appRouter.createCallbackResponse(req, appUrl);

  // Establish CSRF secret and cookie.
  const csrfSecret = createCsrfSecret();
  session.csrfSecret = csrfSecret;
  await setCsrfTokenCookie(csrfSecret, callbackResponse);

  // Save all fields into the session
  await session.save();

  // Send the user back to the Invotastic application.
  return callbackResponse;
}
