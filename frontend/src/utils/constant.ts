export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// auth urls
export const SIGNUP = `${BASE_URL}/api/auth/register/`; // sign up user api endpoint
export const SIGNIN = `${BASE_URL}/api/auth/login/`; // sign in user api endpoint
//videos urls
export const PUBLISHVIDEO = `${BASE_URL}/api/video/publish/`; // video publish api endpoint
export const GETVIDEOS = `${BASE_URL}/api/video/getvideos/`; // get videos api endpoint
export const GETVIDEO = `${BASE_URL}/api/video/getvideo/`; // get video  api endpoint
export const ADDLIKE = `${BASE_URL}/api/video/addlike/`; // get video  api endpoint
export const RECORDVIEW = `${BASE_URL}/api/video/recordview/`; // record views api endpoint
export const RECORDWATCHTIME = `${BASE_URL}/api/video/recordwatchtime/`; // record watchtime api endpoint
export const GETMYVIDEOS = `${BASE_URL}/api/video/getmyvideos/`; // get my videos api endpoint
export const GETUSERVIDOES = `${BASE_URL}/api/video/getuservideos/`; // get user's videos api endpoint
