import { Injectable } from '@nestjs/common';
import { StudentPdfDto } from './dto/student-pdf.dto';
import puppeteer from 'puppeteer';
import * as fs from 'fs-extra';
import handlebars from 'handlebars';
import path from 'path';

@Injectable()
export class PdfService {

  async getDocument(data: StudentPdfDto) {

    const htmlTemplate = await fs.readFileSync('./public/index.hbs', 'utf8');
    const template = handlebars.compile(htmlTemplate);
    const html = template(data);

    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: true
    });

    var page = await browser.newPage();
    await page.goto(`data:text/html;charset=UTF-8,${html}`, {
      waitUntil: 'networkidle0'
    });

    const buffer = await page.pdf({ format: 'A4' });
	  await browser.close();
    
    return buffer;
  }
}
