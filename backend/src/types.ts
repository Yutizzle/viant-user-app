export interface NewUser {
  id?: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface UpdateUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface Validation {
  valid: Boolean;
  message: string;
}
