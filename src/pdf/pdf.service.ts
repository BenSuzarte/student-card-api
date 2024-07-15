import { Injectable } from '@nestjs/common';
import { StudentPdfDto } from './dto/student-pdf.dto';
import puppeteer from 'puppeteer';
import * as fs from 'fs-extra';
import handlebars from 'handlebars';
import * as path from 'path';

@Injectable()
export class PdfService {
  async getDocument(data: StudentPdfDto) {

    // Usar path.resolve para garantir o caminho correto do arquivo
    const htmlPath = path.join(process.cwd(), "public/document.html");
    const cssPath = path.join(process.cwd(), "public/styles/style.css");
    const logoPath = path.join(process.cwd(), 'public/images/logo-dne-branco.png');
    const picturePath = path.join(process.cwd(), `uploads/${data.pictureFile}`);

    const htmlTemplate = await fs.readFileSync(htmlPath, 'utf8');
    const template = handlebars.compile(htmlTemplate);
    const html = template(data);

    const css = await fs.readFileSync(cssPath, 'utf8');

    const logoBase64 = await this.encodeImageToBase64(logoPath);
    const pictureBase64 = await this.encodeImageToBase64(picturePath);

    // Substituir caminhos de imagem no HTML
    const htmlWithImages = html
      .replace('/images/logo-dne-branco.png', `data:image/png;base64,${logoBase64}`)
      .replace(`../uploads/${data.pictureFile}`, `data:image/png;base64,${pictureBase64}`);

    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: true,
    });

    const page = await browser.newPage();
    await page.setContent(`
      <style>${css}</style>${htmlWithImages}`,
      { waitUntil: 'networkidle0' });

    const buffer = await page.pdf({ format: 'A4', omitBackground: false, printBackground: true });
    await browser.close();

    return buffer;
  }

  private async encodeImageToBase64(filePath: string): Promise<string> {
    const image = await fs.readFile(filePath);
    return image.toString('base64');
  }
}
