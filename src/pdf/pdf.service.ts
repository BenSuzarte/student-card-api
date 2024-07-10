import PDFDocumentWithTables from 'pdfkit-table';
import * as PDFDocument from 'pdfkit';
import { Injectable } from '@nestjs/common';
import { StudentPdfDto } from './dto/student-pdf.dto';

@Injectable()
export class PdfService {

  async generate(data: StudentPdfDto): Promise<Buffer> {
    
    const buffer: Buffer = await new Promise( resolve => {
      const document = new PDFDocument;

      document.fontSize(20)
        .text('Carteira de Estudante', { align: 'center' });

      document.image(`uploads/${data.pictureFile}`, 50, 130,
        { width: 90, height: 120 }
      )

      let textHeight = 120;

      document.moveDown();
      document.fontSize(14)
        .text(`Nome: ${data.name}`, 160, textHeight)
        .text(`CPF: ${data.cpf}`, 160, textHeight += 20)
        .text(`Curso: ${data.course}`, 160, textHeight += 20)
        .text(`Instituição: ${data.college}`, 160, textHeight += 20)
        .text(`Matrícula: ${data.registration}`,160, textHeight += 20)
        .text(`Válido Até: ${data.validUntil}`, 160, textHeight += 20)
        .text(`Código de Uso: ${data.useCode}`, 160, textHeight += 20);

      document.fontSize(10)
        .text('Este documento é válido até a data de expiração indicada.', 0, document.page.height - 50,
          { align: 'center', width: document.page.width });

      const buffer = [];
      document.on('data', buffer.push.bind(buffer));
      document.on('end', () => { resolve(Buffer.concat(buffer)) });
      document.end();
    })

    return buffer;
  }
}
