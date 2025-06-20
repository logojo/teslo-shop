export interface AuthResponse {
    user:  User;
    token: string;
}

export interface User {
    id:       string;
    email:    string;
    fullName: string;
    isActive: boolean;
    roles:    string[];
}

export enum AuthStatus {
  checking,
  authenticathed ,
  noAuthenticathed,
} 




