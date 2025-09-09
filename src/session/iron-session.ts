import { getIronSession, IronSession, SessionOptions } from 'iron-session';

import { SESSION_COOKIE_NAME, SESSION_COOKIE_SECRET } from '@/utils/constants';
import { User } from '@/types/wristband-types';
import { cookies } from 'next/headers';

type SessionData = {
  accessToken: string;
  csrfToken: string;
  expiresAt: number;
  isAuthenticated: boolean;
  refreshToken?: string;
  tenantCustomDomain?: string;
  tenantDomainName: string;
  user: User;
};

const sessionOptions: SessionOptions = {
  cookieName: SESSION_COOKIE_NAME,
  password: SESSION_COOKIE_SECRET,
  cookieOptions: {
    httpOnly: true,
    maxAge: 1800,
    path: '/',
    sameSite: 'lax',
    secure: true,
  },
};

export async function middlewareGetSession(req: Request, res: Response): Promise<IronSession<SessionData>> {
  return await getIronSession<SessionData>(req, res, sessionOptions);
}

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  return await getIronSession<SessionData>(cookieStore, sessionOptions);
}
