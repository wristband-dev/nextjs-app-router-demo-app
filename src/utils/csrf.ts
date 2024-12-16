import { NextRequest } from 'next/server';
import { atou, createSecret, createToken, utoa, verifyToken } from '@edge-csrf/core';

import { CSRF_TOKEN_COOKIE_NAME, CSRF_TOKEN_HEADER_NAME } from './constants';

export function createCsrfSecret(): string {
  return utoa(createSecret(18));
}

export async function isCsrfTokenValid(req: NextRequest, csrfSecret: string): Promise<boolean> {
  const token = req.headers.get(CSRF_TOKEN_HEADER_NAME);
  if (!token || !csrfSecret) {
    return false;
  }

  const isVerified = await verifyToken(atou(token), atou(csrfSecret));
  return isVerified;
}

export async function setCsrfTokenCookie(csrfSecret: string, res: Response) {
  const csrfToken = await createToken(atou(csrfSecret), 8);
  const isSecure = process.env.PUBLIC_DEMO === 'ENABLED';
  const cookieValue = `${CSRF_TOKEN_COOKIE_NAME}=${utoa(csrfToken)}; Path=/; SameSite=Strict; Max-Age=1800${isSecure ? '; Secure' : ''}`;
  res.headers.append('Set-Cookie', cookieValue);
}
