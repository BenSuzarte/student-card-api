import { Controller, Get, Res } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { CurrentStudent } from 'src/auth/decorators/current-student.decorator';
import { StudentEntity } from 'src/student/entities/student.entity';

@Controller('pdf')
export class PdfController {

  constructor( private readonly pdfService: PdfService ) {}

  @Get('me')
  async generate( @Res() res, @CurrentStudent() student: StudentEntity ) {
    const buffer = await this.pdfService.generate(student);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(buffer);
  }
}
