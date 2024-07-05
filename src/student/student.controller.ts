import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentEntity } from './entities/student.entity';
import { SaveStudentDto } from './dto/save-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptionsConfig } from './multer-config.service';

@Controller('students')
export class StudentController 
{
  constructor(private readonly studenteService: StudentService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('picture', MulterOptionsConfig))
  async create(

    @Body() body: SaveStudentDto, 
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image' }),
          new MaxFileSizeValidator({ maxSize: 2097152 }),
        ]
      })
    ) picture: Express.Multer.File

  ): Promise<StudentEntity> 
  {
    return await this.studenteService.save(body, picture)
  }
}
