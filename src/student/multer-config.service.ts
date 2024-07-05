import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { randomBytes } from 'crypto';
import { diskStorage } from 'multer';

export const MulterOptionsConfig: MulterOptions = {
  dest: './uploads',
  storage: diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function(req, file, cb) {
      const datetime = new Date().getTime()
      const encodedFileName = `${datetime}_${file.originalname}`;
      cb(null, encodedFileName)
    }
  })
}