export interface StudentPayload {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
}