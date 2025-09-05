export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

export interface CreateUserData {
  name: string;
  email: string;
  age: number;
}
