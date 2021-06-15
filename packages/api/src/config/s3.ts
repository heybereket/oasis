import AWS from 'aws-sdk';

export const getS3 = () =>
  new AWS.S3({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    endpoint: `https://${process.env.AWS_ENDPOINT}`,
  });
