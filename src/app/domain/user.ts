import { Timezone } from './timezone.domain';
export class User {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  padrao24: boolean;
  locale: Timezone;
  roles: string[];

  access_token: string;
}
