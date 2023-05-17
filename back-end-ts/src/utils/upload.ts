import * as multer from 'multer';
import * as path from 'node:path';

const upload = multer({
  storage: multer.diskStorage({
    destination(_req, _file, callback) {
      callback(null, path.resolve(__dirname, '..', '..', 'public', 'images'));
    },
    filename(_req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

export default upload;