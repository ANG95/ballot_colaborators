export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface GoogleUser {
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  // id: string;
}