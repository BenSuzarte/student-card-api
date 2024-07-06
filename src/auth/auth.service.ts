import { Injectable } from '@nestjs/common';
import { StudentService } from 'src/student/student.service';
import * as bcrypt from 'bcrypt';
import { StudentEntity } from 'src/student/entities/student.entity';
import { StudentPayload } from './models/StudentPayload';
import { JwtService } from '@nestjs/jwt';
import { StudentToken } from './models/StudentToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly studentService: StudentService,
    private readonly jwtService: JwtService
  ) {}

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

  login(student: StudentEntity): StudentToken {
    const payload: StudentPayload = {
      sub: student.id,
      email: student.email,
    }

    const jwtToken = this.jwtService.sign(payload)

    return {
      access_token: jwtToken
    }
  }
}
