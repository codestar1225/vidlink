// local base url
// export const BASE_URL = "http://localhost:5000";

// cloud base url
// export const BASE_URL = "";

// auth urls
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const REGISTER = `${BASE_URL}/api/auth/register/`; // register user api endpoint

