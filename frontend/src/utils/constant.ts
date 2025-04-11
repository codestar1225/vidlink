export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// auth urls
export const SIGNUP = `${BASE_URL}/express/customauth/register/`; // sign up user api endpoint
export const SIGNIN = `${BASE_URL}/express/customauth/login/`; // sign in user api endpoint
//videos urls
export const PUBLISHVIDEO = `${BASE_URL}/express/video/publish/`; // video publish api endpoint
export const GETVIDEOS = `${BASE_URL}/express/video/getvideos/`; // get videos api endpoint
export const GETVIDEO = `${BASE_URL}/express/video/getvideo/`; // get video  api endpoint
export const ADDLIKE = `${BASE_URL}/express/video/addlike/`; // get video  api endpoint
export const RECORDWATCHTIME = `${BASE_URL}/express/video/recordwatchtime/`; // record watchtime api endpoint
export const GETMYVIDEOS = `${BASE_URL}/express/video/getmyvideos/`; // get my videos api endpoint
export const GETCARDS = `${BASE_URL}/express/video/getcards/`; // get cards api endpoint
export const GETUSERVIDEOS = `${BASE_URL}/express/video/getuservideos/`; // get user's videos api endpoint
export const FOLLOWUSER = `${BASE_URL}/express/video/followuser/`; // follow user api endpoint
export const GETUSERINFO = `${BASE_URL}/express/video/getuserinfo/`; // get user info api endpoint
export const SETUSERINFO = `${BASE_URL}/express/video/setuserinfo/`; // set user info api endpoint
export const CHECKUSERNAME = `${BASE_URL}/express/video/checkusername/`; // check username api endpoint
export const GETUSERNAME = `${BASE_URL}/express/video/getusername/`; // get username api endpoint
export const SAVECARD = `${BASE_URL}/express/video/savecard/`; // save card api endpoint
export const INCREASECLICKS = `${BASE_URL}/express/video/increaseclicks/`; // increase card clicks api endpoint
export const WATCHTIME = `${BASE_URL}/express/video/watchtime/`; // watch time record api endpoint
export const GETDATACREATOR = `${BASE_URL}/express/data/getdatacreator/`; // get data as a creator api endpoint
export const GETDATAVIEWER = `${BASE_URL}/express/data/getdataviewer/`; // get data as a viewer api endpoint
export const STOREVIDOEFILE = `${BASE_URL}/express/video/storevideofile/`; // get data as a viewer api endpoint
