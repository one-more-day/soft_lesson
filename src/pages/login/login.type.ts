export type tokenValue = string | null;
export interface User {
  id: string;
  token: string;
  name: string;
  school: string;
  tele: string;
  email: string;
  academy: string;
  auth: number;
  intro?: string;
}
