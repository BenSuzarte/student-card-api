import { IsEmail, IsNotEmpty, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";

export class SaveStudentDto {

  @IsNotEmpty()
  @IsEmail()
  emaill: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
  
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  college: string;

  @IsNotEmpty()
  @IsString()
  course: string;
  
  @IsNotEmpty()
  @IsString()
  @Length(11)
  cpf: string;

  @IsNotEmpty()
  @IsString()
  registration: string;

}