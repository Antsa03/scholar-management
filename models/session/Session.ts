import User from "./User";

export default interface Session {
  user: User;
  expires: string;
  name: string;
  email: string;
  picture: string;
  sub: string;
  id: string;
  userName: string;
  image: string;
  role: string;
  iat: number;
  exp: number;
  jti: string;
}
