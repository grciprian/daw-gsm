import { AppUser } from './app-user';
export interface Gadget {
  id?: string;
  name?: string;
  description?: string;
  customerId?: string;
  customer: AppUser;
}
