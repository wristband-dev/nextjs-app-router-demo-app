import { NextRequest } from 'next/server';
import {
  createWristbandAuth,
  destroySessionWithCookies,
  getMutableSessionFromCookies,
  getReadOnlySessionFromCookies,
  getSessionFromRequest,
  MutableSession,
  NextJsCookieStore,
  saveSessionWithCookies,
  SessionOptions
} from '@wristband/nextjs-auth';

import { MySessionData } from '@/types';

/* WRISTBAND_TOUCHPOINT - AUTHENTICATION */

/**
 * Wristband authentication client for handling OAuth flows (login, callback, logout).
 * 
 * Use this client to:
 * - Initiate login redirects: `wristbandAuth.appRouter.login()`
 * - Handle OAuth callbacks: `wristbandAuth.appRouter.callback()`
 * - Handle logout: `wristbandAuth.appRouter.logout()`
 * - Create authentication middleware and session helpers
 */
export const wristbandAuth = createWristbandAuth({
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  wristbandApplicationVanityDomain: process.env.APPLICATION_VANITY_DOMAIN!,
  scopes: ['openid', 'offline_access', 'profile', 'email', 'roles'],
  dangerouslyDisableSecureCookies: true,  // IMPORTANT: Only for local development. Remove in Prod!
});

/**
 * Session configuration used across all session management utilities.
 * 
 * IMPORTANT: In production, use a strong secret and set "secure: true".
 */
const sessionOptions: SessionOptions = { secrets: 'dummy-value-463a-812c-0d8db87c0ec5c1', secure: false };

/**
 * Authentication middleware that protects routes in the Next.js middleware/proxy.
 * 
 * Supports two authentication strategies (tried in the order listed):
 * 1. JWT - Validates Bearer tokens in Authorization header
 * 2. SESSION - Validates session cookies and refreshes expired tokens
 * 
 * When protected routes fail all auth strategies:
 * - APIs: "/api/v1/*" - Returns 401 if unauthenticated
 * - Pages: "/", "/server" - Defaults to a redirect to Login Endpoint (Client and Server Components only)
 * 
 * NOTE: Server Actions are NOT protected by this middleware and must use check auth in the action's code.
 */
export const requireMiddlewareAuth = wristbandAuth.createMiddlewareAuth<MySessionData>({
  authStrategies: ['JWT', 'SESSION'],
  sessionConfig: { sessionOptions },
  protectedApis: ['/api/v1(.*)'],
  protectedPages: ['/', '/server'],
});

/**
 * Authentication helper specifically for Server Actions.
 * 
 * Since Server Actions bypass the Next.js middleware/proxy, they must perform their own auth checks.
 * This helper validates the session and automaticallyrefreshes expired tokens.
 */
export const requireServerActionAuth = wristbandAuth.appRouter.createServerActionAuth<MySessionData>({
  sessionOptions
});

/**
 * Retrieves the session from a NextRequest.
 * 
 * Use in:
 * - API Route Handlers
 * - Middleware/proxy functions
 */
export function getRequestSession(request: NextRequest) {
  return getSessionFromRequest<MySessionData>(request, sessionOptions);
}

/**
 * Retrieves read-only session for Server Components.
 * 
 * Server Components render during the RSC render phase and cannot set response headers
 * or modify cookies. For mutations, use Server Actions or API routes instead.
 */
export function getServerComponentSession(cookieStore: NextJsCookieStore) {
  return getReadOnlySessionFromCookies<MySessionData>(cookieStore, sessionOptions);
}

/**
 * Retrieves mutable session for Server Actions.
 * 
 * Unlike Server Components, Server Actions can modify the session. Use this to
 * get a session that can be updated and saved back to cookies.
 */
export async function getServerActionSession(cookieStore: NextJsCookieStore) {
  return await getMutableSessionFromCookies<MySessionData>(cookieStore, sessionOptions);
}

/**
 * Saves modified session data back to cookies in Server Actions.
 * 
 * Call this after making changes to a mutable session to persist the updates.
 */
export async function saveServerActionSession(cookieStore: NextJsCookieStore, session: MutableSession<MySessionData>) {
  await saveSessionWithCookies(cookieStore, session);
}

/**
 * Destroys the session and clears session cookies in Server Actions.
 * 
 * Use this for custom logout flows or when you need to clear the session
 * without redirecting to Wristband's logout endpoint.
 */
export function destroyServerActionSession(cookieStore: NextJsCookieStore, session: MutableSession<MySessionData>) {
  destroySessionWithCookies(cookieStore, session);
}
