import {UserInfo} from './user-info';

export class JwtResponse {
  token: string;
  userDTO: UserInfo;
}
