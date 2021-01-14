export interface User {
  id: string;
  name: string;
  email?: string;
  activationToken?: string;
  sessionToken?: string;
}
