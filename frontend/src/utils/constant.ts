export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// auth urls
export const SIGNUP = `${BASE_URL}/api/auth/register/`; // sign up user api endpoint
export const SIGNIN = `${BASE_URL}/api/auth/login/`; // sign in user api endpoint
//videos urls
export const PUBLISHVIDEO = `${BASE_URL}/api/video/publish/`; // video publish api endpoint
export const GETVIDEOS = `${BASE_URL}/api/video/getvideos/`; // get videos api endpoint
export const GETVIDEO = `${BASE_URL}/api/video/getvideo/`; // get video  api endpoint
export const ADDLIKE = `${BASE_URL}/api/video/addlike/`; // get video  api endpoint
export const RECORDWATCHTIME = `${BASE_URL}/api/video/recordwatchtime/`; // record watchtime api endpoint
export const GETMYVIDEOS = `${BASE_URL}/api/video/getmyvideos/`; // get my videos api endpoint
export const GETUSERVIDEOS = `${BASE_URL}/api/video/getuservideos/`; // get user's videos api endpoint
export const FOLLOWUSER = `${BASE_URL}/api/video/followuser/`; // follow user api endpoint
export const GETUSERINFO = `${BASE_URL}/api/video/getuserinfo/`; // get user info api endpoint
export const SETUSERINFO = `${BASE_URL}/api/video/setuserinfo/`; // set user info api endpoint
export const CHECKUSERNAME = `${BASE_URL}/api/video/checkusername/`; // check username api endpoint
export const GETUSERNAME = `${BASE_URL}/api/video/getusername/`; // get username api endpoint
