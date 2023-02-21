import { diskStorage } from 'multer';

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString() + '-' + file.originalname);
    },
  }),
};
