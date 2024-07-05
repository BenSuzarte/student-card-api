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

  async save(data: SaveStudentDto, picture: Express.Multer.File): Promise<StudentEntity> {
    
    const now = new Date();
    const validUntilDate = `05/${now.getFullYear() + 1}`;

    const useCode = `BRA${Math.random().toString(9).substring(15)}BA`;

    const student = {
      ...data,
      validUntil: validUntilDate,
      useCode: useCode,
      pictureFile: picture.filename
    }
    
    return await this.studentRepository.save(this.studentRepository.create(student))
  }
}
