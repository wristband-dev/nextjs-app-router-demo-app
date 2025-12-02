'use client';

import { ReactNode } from 'react';
import { WristbandAuthProvider } from '@wristband/react-client-auth';

import { MySessionMetadata } from '@/types';

// NOTE: For App Router, we need to use the 'use client' directive in a wrapper component.
export function WristbandAuthProviderWrapper({ children }: { children: ReactNode }) {
  return (
    /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
    <WristbandAuthProvider<MySessionMetadata>
      loginUrl="/api/auth/login"
      sessionUrl="/api/auth/session"
      tokenUrl="/api/auth/token"
    >
      {children}
    </WristbandAuthProvider>
  );
}
