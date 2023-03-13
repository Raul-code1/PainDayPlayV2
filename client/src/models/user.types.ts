export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

export interface UserAppState extends UserResponse {
  isAuthenticated: boolean;
}

export interface UserRegisterInput {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
export interface UserLoginInput {
  email: string;
  password: string;
}

export const UserEmptyState: UserAppState = {
  isAuthenticated: false,
  _id: '',
  name: '',
  email: '',
  role: '',
  token: '',
};
