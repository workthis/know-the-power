export interface User {
  id: number;
  email: string;
  gender: string;
  age: number;
  height: number;
  initialWeight: number;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface Workout {
  id: number;
  name: string;
  type: string;
  date: string;
  exercises?: any[];
}