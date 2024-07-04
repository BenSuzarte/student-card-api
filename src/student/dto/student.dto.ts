import { IsNotEmpty, Max, Min } from "class-validator";

export class SaveStudentDto {
  
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  college: string;

  @IsNotEmpty()
  course: string;
  
  @IsNotEmpty()
  @Max(11)
  @Min(11)
  cpf: string;

  @IsNotEmpty()
  registration: string;

}