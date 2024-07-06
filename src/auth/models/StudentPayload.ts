export interface StudentPayload {
  sub: string;
  email: string;
  name: string;
  college: string;
  course: string;
  cpf: string;
  registration: string;
  validUntil: string;
  useCode: string;
  pictureOriginalName: string;
  pictureFile: string;
  pictureUrl: string;
  iat?: number;
  exp?: number;
}