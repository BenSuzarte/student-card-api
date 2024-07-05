import { IsJSON, IsNotEmpty, Max, Min } from "class-validator";

export class SaveStudentDto {
  
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  college: string;

  @IsNotEmpty()
  course: string;
  
  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  registration: string;

}