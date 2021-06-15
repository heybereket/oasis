import s3 from '@config/s3';
import { createContext } from '@utils/auth/createContext';
import { joinRoot } from '@utils/common/rootPath';
import { S3 } from 'aws-sdk';
import { Router } from 'express';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { parse } from 'path';
import { v4 } from 'uuid';

const THREE_MB = 3145728;

export const Upload = (): Router => {
  const uploadRouter = Router();

  // Require auth to upload
  uploadRouter.use(async (req, res, next) => {
    const context = await createContext(req);

    if (context.hasAuth) {
      next();
    } else {
      res.send('401 Unauthorized').status(401);
    }
  });

  uploadRouter.post('/', (req, res) => {
    let file = req.files?.file;

    if (Array.isArray(file)) {
      file = file[0];
    }

    if (file.size > THREE_MB) {
      res.send('File cannot be larger than 3 mb').status(400);
      return;
    }

    if (file.mimetype.split('/')[0] !== 'image') {
      res.send('Only image uploads are allowed').status(400);
      return;
    }

    const { ext } = parse(file.name);

    const filename = v4() + ext;

    if (process.env.STORE_IMAGES_ON_S3 === 'true') {
      const uploadParams: S3.PutObjectRequest = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: filename,
        Body: file.data,
        ACL: 'public-read',
      };

      s3().upload(uploadParams, (err, data) => {
        if (err) {
          console.error(err);
          res.send('An error occured').status(500);
        }
        if (data) {
          res.send(filename);
        }
      });
    } else if (process.env.STORE_IMAGES_LOCALLY === 'true') {
      // Check if folder exists
      if (!existsSync(joinRoot('..', 'images'))) {
        // If it doesnt make it
        mkdirSync(joinRoot('..', 'images'));
      }

      writeFileSync(joinRoot('..', 'images', filename), file.data);
      res.send(filename);
    } else {
      res.send('Storage method is not configured').status(500);
    }
  });

  return uploadRouter;
};
