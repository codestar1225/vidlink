export type AuthSuccessResponse = {
  message: string;
  token: string;
  name?: string;
  pic?: string;
};

export type AuthErrorResponse = {
  message: string;
};
