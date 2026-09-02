export interface User {
  id: string;
  email: string;
  password: string;
  role: Role;
  name?: string;
  phone?: string;
  address?: string;
}

enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
