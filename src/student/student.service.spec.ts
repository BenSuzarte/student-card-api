import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { StudentEntity } from './student.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('StudentService', () => {
  let studentService: StudentService;
  let studentRepository: Repository<StudentEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(StudentEntity),
          useValue: {
            save: jest.fn()
          }
        }
      ],
    }).compile();

    studentService = module.get<StudentService>(StudentService);
    studentRepository = module.get<Repository<StudentEntity>>(getRepositoryToken(StudentEntity))
  });

  it('should be defined', () => {
    expect(studentService).toBeDefined();
    expect(studentRepository).toBeDefined();
  });
});
