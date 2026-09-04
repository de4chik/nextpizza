export interface IUser {
  id: string;
  email: string;
  password: string;
  role: Role;
  name?: string;
  phone?: string;
  address?: string;
}

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}
