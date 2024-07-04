import { Body, Controller, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentEntity } from './student.entity';
import { SaveStudentDto } from './dto/save-student.dto';

@Controller('student')
export class StudentController 
{
  constructor(private readonly studenteService: StudentService) {}

  @Post()
  async create(@Body() body: SaveStudentDto): Promise<StudentEntity> {
    return await this.studenteService.save(body)
  }
}
