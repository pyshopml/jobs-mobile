export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface ISignupCredentials {
  email: string;
  password: string;
  name: string;
}

export interface IValidateToken {
  auth_token: string;
}