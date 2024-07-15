import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StudentEntity } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveStudentDto } from './dto/save-student.dto';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StudentService 
{
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>
  ) {}

  async save(data: SaveStudentDto, picture: Express.Multer.File): Promise<StudentEntity | Error> {

    try {
      
      const now = new Date();
      const validUntilDate = `05/${now.getFullYear() + 1}`;

      const useCode = `BRA${Math.random().toString(9).substring(15)} `;

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

    } catch (error) {
      console.log(error)
      await this.deleteFile(picture.filename)
      return new Error("Não foi possível criar o estudante");
    }
  }

  private async deleteFile(filename: string): Promise<void> {
    const filePath = path.join(__dirname, '..', '..', 'uploads', filename);
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async findByEmail(email: string) {
    return await this.studentRepository.findOne({ where: { email } })
  }

}
