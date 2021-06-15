import s3 from '@config/s3';
import { joinRoot } from '@utils/common/rootPath';
import { Router } from 'express';
import { writeFileSync } from 'fs';
import { parse } from 'path';
import { v4 } from 'uuid';

export const Upload = (): Router => {
  const uploadRouter = Router();

  uploadRouter.post('/', (req, res) => {
    let file = req.files?.file;

    if (Array.isArray(file)) {
      file = file[0];
    }

    const { ext } = parse(file.name);

    const filename = v4() + ext;

    if (process.env.STORE_IMAGES_ON_S3 === 'true') {
      const upload = s3.upload({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: filename,
        Body: file.data,
        ACL: 'public-read',
        CacheControl: 'max-age=2592000'
      });

      upload.send(err => {
        if (err) {
          res.send('An error occured').status(500);
        }
      });
    } else if (process.env.STORE_IMAGES_LOCALLY === 'true') {
      writeFileSync(joinRoot('..', 'images', filename), file.data);
      res.send(filename);
    } else {
      res.send('Storage method is not configured').status(500);
    }
  });

  return uploadRouter;
};
