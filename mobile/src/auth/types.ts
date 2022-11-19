export interface LoginResponse {
    status: string;
    accessToken: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface User {
    name: string;
    email: string;
}

export interface UserResponse {
    status: string;
    data: {
        user: User
    }
}