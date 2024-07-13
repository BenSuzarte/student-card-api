import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { Controller, Get, Param, Res } from "@nestjs/common";
import { CurrentStudent } from "./auth/decorators/current-student.decorator";
import { StudentEntity } from "./student/entities/student.entity";

@Controller()
export class AppController 
{

  @Get('me')
  getOneStudent(@CurrentStudent() student: StudentEntity) {
    return student
  }

  @IsPublic()
  @Get('uploads/:imgpath')
  getImage(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: 'uploads' })
  }

}