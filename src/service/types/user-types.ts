export enum UserActionTypes {
    TRY_AUTH = 'TRY_AUTH',
    AUTH_SUCCESS = 'AUTH_SUCCESS',
    AUTH_FAIL = 'AUTH_FAIL',
    LOGOUT = 'LOGOUT',
}

export interface User {
    email: string;
    username: string;
    token: string;
    image: string | null;
}

export interface UserState {
    user: User | null;
    error: string | null;
    loading: boolean;
}

export interface UserAction {
    type: keyof typeof UserActionTypes;
    payload?: any;
}

export interface UserSignIn {
    email: string;
    password: string;
}

export interface UserSignUp extends UserSignIn {
    passwordСonfirmation: string;
    username: string;
}
