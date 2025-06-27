export interface AuthPayload {
  id: string;
}

export interface AuthRequestBody {
  email: string;
  password: string;
}

export interface SignupRequestBody extends AuthRequestBody {
  first_name: string;
  last_name: string;
}
