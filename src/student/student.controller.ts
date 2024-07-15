import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentEntity } from './entities/student.entity';
import { SaveStudentDto } from './dto/save-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptionsConfig } from './multer-config.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('students')
export class StudentController 
{
  constructor(private readonly studenteService: StudentService) {}

  @IsPublic()
  @Post('/create')
  @UseInterceptors(FileInterceptor('picture', MulterOptionsConfig))
  async create(

    @Res() res,
    @Body() body: SaveStudentDto, 
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image' }),
          new MaxFileSizeValidator({ maxSize: 2097152 }),
        ]
      })
    ) picture: Express.Multer.File

  ) 
  {
    const response = await this.studenteService.save(body, picture)
    if (response instanceof Error) {
      return res.status(422).json({ error: response.message })
    }
    return res.json(response).status(201);
  }
}
