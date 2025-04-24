'use client';

import { ReactNode } from 'react';
import { WristbandAuthProvider } from '@wristband/react-client-auth';

import { MySessionMetadata } from '@/types/wristband-types';

interface Props {
  children: ReactNode;
}

export function WristbandAuthProviderWrapper({ children }: Props) {
  return (
    /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
    <WristbandAuthProvider<MySessionMetadata>
      loginUrl="/api/auth/login"
      logoutUrl="/api/auth/logout"
      sessionUrl="/api/v1/session"
    >
      {children}
    </WristbandAuthProvider>
  );
}
