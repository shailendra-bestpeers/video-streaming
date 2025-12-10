export interface User {
  _id: string;      // <-- REQUIRED
  name: string;
  email: string;
  role: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}