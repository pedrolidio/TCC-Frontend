export interface User {
  id: number;
  username: string;
  role_id: number;
}

export interface CreateUserPayload {
  username: string;
  password: string;
}