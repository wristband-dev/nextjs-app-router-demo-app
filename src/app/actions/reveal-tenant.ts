'use server';

import { cookies } from 'next/headers';

import { JSON_MEDIA_TYPE } from '@/constants';
import { ServerActionState, Tenant } from '@/types';
import { requireServerActionAuth } from '@/wristband';

export async function revealTenant(): Promise<ServerActionState> {
  /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
  // Get the current cookies to establish the session
  const cookieStore = await cookies();
  const { authenticated, session } = await requireServerActionAuth(cookieStore);

  // Check the result of auth validation
  if (!authenticated) {
    return { message: `You are not authenticated. Please log in again.`, authError: true };
  }

  // Safety check
  const { accessToken, tenantId } = session;
  if (!accessToken || !tenantId) {
    return { message: `Session is invalid.`, authError: true };
  }

  const response = await fetch(`https://${process.env.APPLICATION_VANITY_DOMAIN}/api/v1/tenants/${tenantId}`, {
    cache: 'no-store',
    method: 'GET',
    keepalive: true,
    headers: { 'Content-Type': JSON_MEDIA_TYPE, Accept: JSON_MEDIA_TYPE, Authorization: `Bearer ${accessToken}` },
  });

  if (response.status !== 200) {
    return { message: `There was an unexpected error. Try again.`, authError: false };
  }

  const tenant = await response.json() as Tenant;
  return { message: JSON.stringify(tenant, null, 2), authError: false };
}
