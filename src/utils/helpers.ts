import { AxiosError } from 'axios';

import { Userinfo } from '@/types/wristband-types';

export function parseUserinfo(userinfo: Userinfo) {
  return {
    id: userinfo.sub,
    tenantId: userinfo.tnt_id,
    applicationId: userinfo.app_id,
    identityProviderName: userinfo.idp_name,
    email: userinfo.email,
    emailVerified: userinfo.email_verified,
    username: userinfo.preferred_username,
    fullName: userinfo.name,
    firstName: userinfo.given_name,
    middleName: userinfo.middle_name,
    lastName: userinfo.family_name,
    nickname: userinfo.nickname,
    pictureURL: userinfo.picture,
    gender: userinfo.gender,
    birthdate: userinfo.birthdate,
    timezone: userinfo.zoneinfo,
    locale: userinfo.locale,
    updatedAt: userinfo.updated_at,
    roles: userinfo.roles,
  };
}

export function isUnauthorizedError(error: unknown) {
  if (!error) {
    return false;
  }

  if (error instanceof AxiosError) {
    return error.response?.status === 401;
  }

  return false;
}
