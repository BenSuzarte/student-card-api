import { Request } from "express";
import { StudentEntity } from "src/student/entities/student.entity";

export interface AuthRequest extends Request {
  user: StudentEntity;
}