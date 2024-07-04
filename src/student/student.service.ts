import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StudentEntity } from './student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveStudentDto } from './dto/save-student.dto';

@Injectable()
export class StudentService 
{
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>
  ) {}

  async save(data: SaveStudentDto): Promise<StudentEntity> {
    return await this.studentRepository.save(this.studentRepository.create(data))
  }
}
