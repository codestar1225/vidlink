export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// local base url
// cloud base url
// auth urls
export const SIGNUP = `${BASE_URL}/api/auth/register/`; // sign up user api endpoint
export const SIGNIN = `${BASE_URL}/api/auth/login/`; // sign in user api endpoint
export const UPLOADVIDEO = `${BASE_URL}/api/upload/uploadvideo/`; // vdeo upload api endpoint
export const PUBLISHVIDEO = `${BASE_URL}/api/upload/publish/`; // video publish api endpoint
