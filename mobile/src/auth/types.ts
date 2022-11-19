export interface LoginResponse {
  status: string;
  jwt: string;
}

export interface LoginInput {
  identifier: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
}

export interface UserResponse {
  status: string;
  data: {
    user: User;
  };
}
