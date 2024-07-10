import { Injectable } from '@nestjs/common';
import { StudentService } from 'src/student/student.service';
import * as bcrypt from 'bcrypt';
import { StudentEntity } from 'src/student/entities/student.entity';
import { StudentPayload } from './models/StudentPayload';
import { JwtService } from '@nestjs/jwt';
import { StudentToken } from './models/StudentToken';
import { UnauthorizedError } from './errors/unauthorized.error';

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

    throw new UnauthorizedError('Email address or password provided is incorrect.');
  }

  login(student: StudentEntity): StudentToken {
    const { 
      id,
      createdAt,
      deletedAt,
      updatedAt,
      ...rest 
    } = student

    const payload: StudentPayload = {
      sub: id,
      url: `${process.env.API_URL}/uploads/${rest.pictureFile}`,
      ...rest
    }

    const jwtToken = this.jwtService.sign(payload)

    return {
      access_token: jwtToken
    }
  }
}
