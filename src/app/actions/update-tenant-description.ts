'use server';

import { cookies } from 'next/headers';

import { JSON_MEDIA_TYPE } from '@/constants';
import { ServerActionState, Tenant } from '@/types';
import { destroyServerActionSession, getServerActionSession, saveServerActionSession } from '@/wristband';

export async function updateTenantDescription(
  _prevState: ServerActionState,
  formData: FormData
): Promise<ServerActionState> {
  /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
  // Get the current cookies to establish the session
  const cookieStore = await cookies();
  const session = await getServerActionSession(cookieStore);
  const { accessToken, isAuthenticated, tenantId } = session;

  if (!isAuthenticated || !accessToken) {
    destroyServerActionSession(cookieStore, session);
    return { message: `You are not authenticated. Please log in again.`, authError: true };
  }

  // Safety check
  if (!tenantId) {
    destroyServerActionSession(cookieStore, session);
    return { message: `Session is invalid.`, authError: true };
  }

  // Validate description
  const description = formData.get('description') as string | null;
  if (!description) {
    return { message: `A valid description is required.`, authError: false };
  }

  const response = await fetch(`https://${process.env.APPLICATION_VANITY_DOMAIN}/api/v1/tenants/${tenantId}`, {
    cache: 'no-store',
    method: 'PATCH',
    keepalive: true,
    headers: { 'Content-Type': JSON_MEDIA_TYPE, Accept: JSON_MEDIA_TYPE, Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ description }),
  });

  if (response.status !== 200) {
    if (response.status !== 401) {
      destroyServerActionSession(cookieStore, session);
      return { message: `Access token is invalid. Please log in again.`, authError: true };
    }
    return { message: `There was an unexpected error. Try again.`, authError: false };
  }

  // Here's an example of how to update the session in a Server Action
  session.tenantDescription = description;
  await saveServerActionSession(cookieStore, session);

  const tenant = await response.json() as Tenant;
  return { message: tenant.description, authError: false };
}
