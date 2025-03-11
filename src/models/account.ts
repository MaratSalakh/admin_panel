export type Account = {
  id: number;
  mark: string;
  validateMark: boolean;
  accountType: string | null;
  login: string;
  validateLogin: boolean;
  password: string;
  validatePassword: boolean;
};

export type NewAccount = {
  id: number;
  mark: { text: string }[];
  validateMark: boolean;
  accountType: string | null;
  login: string;
  validateLogin: boolean;
  password: string | null;
  validatePassword: boolean;
};
