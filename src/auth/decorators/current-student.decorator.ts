import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { StudentEntity } from 'src/student/entities/student.entity';
import { AuthRequest } from '../models/AuthRequest';

export const CurrentStudent = createParamDecorator(
  (data: unknown, context: ExecutionContext): StudentEntity => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);