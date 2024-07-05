import { Injectable } from '@nestjs/common';
import { StudentService } from 'src/student/student.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor (private readonly studentService: StudentService) {}

  async validateUser(email: string, password: string) {
    const student = await this.studentService.findByEmail(email);

    if(student) {
      const isPasswordValid = await bcrypt.compare(password, student.password)
      if(isPasswordValid) {
        return {
          ...student,
          password: undefined
        }
      }
    }

    throw new Error('Email address or password provided is incorrect.')
  }

  async login() {
    throw new Error('Method not implemented.');
  }
}
