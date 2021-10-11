import {Role} from './role';

export class UserInfo {
  id: number;
  code: string;
  username: string;
  phone: string;
  email: string;
  roles: Role[];
}
