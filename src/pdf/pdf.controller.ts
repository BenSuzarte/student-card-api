import { Body, Controller, Get, Header, Res } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { CurrentStudent } from 'src/auth/decorators/current-student.decorator';
import { StudentEntity } from 'src/student/entities/student.entity';

@Controller('document')
export class PdfController {

  constructor( private readonly pdfService: PdfService ) {}

  @Get('me')
  @Header('Content-type', 'application/pdf')
  async generate( 

    @Res() res, 
    @CurrentStudent() student: StudentEntity, 
    
  ) {

    const buffer = await this.pdfService.getDocument(student);
    res.send(buffer);

  }
}
