export type AuthDto = {
  username: string;
  password: string;
  email?: string;
};

export type SaveAccountDto = {
  username: string;
  password: string;
  email?: string;
  newPassword: string;
};
