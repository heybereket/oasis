import s3 from '@config/s3';
import { createContext } from '@utils/auth/createContext';
import { joinRoot } from '@utils/common/rootPath';
import { S3 } from 'aws-sdk';
import { Router } from 'express';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { v4 } from 'uuid';
import sharp from 'sharp';
import { redisClient } from '@config/redis';

const THREE_MB = 3145728;
const UPLOAD_LIMIT = 20;
const ONE_HR_IN_SECS = 60 * 60;

export const Upload = (): Router => {
  const uploadRouter = Router();

  // Require auth to upload
  uploadRouter.use(async (req, res, next) => {
    const context = await createContext(req);

    if (context.hasAuth) {
      next();
    } else {
      res.status(401).send('401 Unauthorized');
    }
  });

  uploadRouter.post('/', async (req, res) => {
    let file = req.files?.file;

    if (Array.isArray(file)) {
      file = file[0];
    }

    if (file.size > THREE_MB) {
      res.status(400).send('File cannot be larger than 3 mb');
      return;
    }

    if (file.mimetype.split('/')[0] !== 'image') {
      res.status(400).send('Only image uploads are allowed');
      return;
    }

    const context = await createContext(req);
    // check rateLimit
    const oldLimit = Number.parseInt(
      await redisClient.get(`rate:upload:${context.uid}`)
    );
    if (oldLimit > UPLOAD_LIMIT) {
      res.status(429).send('RATE_LIMIT: Try again later');
      return;
    }

    const filename = v4() + '.webp';

    const webPBuffer = await sharp(file.data, { pages: -1 })
      .webp({ quality: 50 })
      .toBuffer();

    if (process.env.STORE_IMAGES_ON_S3 === 'true') {
      const uploadParams: S3.PutObjectRequest = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: filename,
        Body: webPBuffer,
        ACL: 'public-read',
      };

      s3().upload(uploadParams, (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).send('An error occured');
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

      writeFileSync(joinRoot('..', 'images', filename), webPBuffer);
      res.send(filename);
    } else {
      res.status(500).send('Storage method is not configured');
    }

    if (Number.isNaN(oldLimit)) {
      redisClient.set(`rate:upload:${context.uid}`, 1, 'EX', ONE_HR_IN_SECS);
    } else {
      redisClient.set(
        `rate:upload:${context.uid}`,
        (oldLimit + 1).toString(),
        'KEEPTTL'
      );
    }
  });

  return uploadRouter;
};
