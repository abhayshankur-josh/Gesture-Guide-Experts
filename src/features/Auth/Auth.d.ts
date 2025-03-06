interface IAuthSignupRequest {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
}

interface IAuthLoginRequest {
    email: string;
    password: string;
}

interface IAuthState {
    token: string | null;
}
 