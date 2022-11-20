import { UserWithId } from '../axios/types';

export interface LoginResponse {
  status: string;
  user: UserWithId;
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
