import type { SessionData } from '@wristband/nextjs-auth';

/**
 * Custom session data type for this application for Wristband NextJS Auth SDK.
 * Extends the base SessionData from the Wristband SDK with app-specific fields.
 */
export interface MySessionData extends SessionData {
  // Custom Fields
  email?: string;
  tenantDescription?: string;
}

/**
 * Custom session metadata for Wristband React Client Auth SDK.
 * The metadata is accessible via the `useWristbandSession()` hook in React components.
 */
export type MySessionMetadata = {
  email: string;
};

/**
 * Response data for the Hello World API route handlers.
 */
export type HelloWorldData = {
  message: string
};

export type ServerActionState = {
  message: string;
  authError: boolean;
};

export type Tenant = {
  id: string;
  applicationId: string;
  type: string;
  vanityDomain: string;
  resolvedVanityDomain: string;
  resolvedVanityDomainSource: string;
  domainName: string;
  displayName: string;
  description: string;
  signupEnabled: boolean;
  status: string;
  resolvedClassifier: string;
  logoUrl: string;
  publicMetadata: object;
  restrictedMetadata: object;
  discoveryEmailDomains: string[];
  allowedSignupEmailDomains: string[];
  metadata: {
    version: number;
    lastModifiedTime: string;
    creationTime: string;
    activationTime: string;
    deactivationTime: string;
  };
};
