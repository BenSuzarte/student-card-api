import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

describe('StudentController', () => {
  let studentController: StudentController;
  let studentService: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        {
          provide: StudentService,
          useValue: {
            save: jest.fn()
          }
        }
      ]
    }).compile();

    studentController = module.get<StudentController>(StudentController);
    studentService = module.get<StudentService>(StudentService)
  });

  it('should be defined', () => {
    expect(studentController).toBeDefined();
    expect(studentService).toBeDefined();
  });
});
