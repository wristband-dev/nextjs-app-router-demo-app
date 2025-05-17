export const INVOTASTIC_HOST: string = 'localhost:6001';

export const APPLICATION_LOGIN_URL: string = `https://${process.env.APPLICATION_VANITY_DOMAIN}/login`;
export const AUTH_CALLBACK_URL: string = `http://${INVOTASTIC_HOST}/api/auth/callback`;
export const FORM_URLENCOED_MEDIA_TYPE: string = 'application/x-www-form-urlencoded';
export const JSON_MEDIA_TYPE: string = 'application/json;charset=UTF-8';
export const LOGIN_REQUIRED_ERROR: string = 'login_required';
export const LOGIN_STATE_COOKIE_PREFIX: string = 'login:';
export const LOGIN_STATE_COOKIE_SECRET: string = '7ffdbecc-ab7d-4134-9307-2dfcc52f7475';
export const SESSION_COOKIE_NAME: string = 'session';
export const SESSION_COOKIE_SECRET: string = '96bf13d5-b5c1-463a-812c-0d8db87c0ec5';
export const TENANT_DOMAIN_TOKEN: string = '{tenant_domain}';

// CSRF constants
export const CSRF_TOKEN_COOKIE_NAME = 'CSRF-TOKEN';
export const CSRF_TOKEN_HEADER_NAME = 'x-csrf-token';
