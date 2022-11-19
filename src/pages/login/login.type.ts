export type tokenValue = string | null;
export interface User {
  id: string;
  token: string;
  name: string;
  tele: string;
  auth: number;
}
