import { NextResponse } from 'next/server';

import { CSRF_TOKEN_COOKIE_NAME } from './constants';

export function createCsrfToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function updateCsrfCookie(csrfToken: string, res: NextResponse) {
  const cookieValue = `${CSRF_TOKEN_COOKIE_NAME}=${csrfToken}; Path=/; SameSite=Strict; Max-Age=1800; Secure`;
  res.headers.append('Set-Cookie', cookieValue);
}
