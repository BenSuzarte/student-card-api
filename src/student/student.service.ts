import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StudentEntity } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveStudentDto } from './dto/save-student.dto';
import * as bcrypt from 'bcrypt';

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
      pictureOriginalName: picture.originalname,
      pictureFile: picture.filename,
      password: await bcrypt.hash(data.password, 10)
    }
    
    const newStudent = await this.studentRepository.save(this.studentRepository.create(student));

    return {
      ...newStudent,
      password: undefined
    }
  }

  async findByEmail(email: string) {
    return await this.studentRepository.findOne({ where: { email } })
  }

}
