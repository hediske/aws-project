import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';

dotenv.config();
const s3 = new aws.S3(
);

const uploadS3 = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const prefix = req.body.prefix || '';
      const fileName = `${prefix}/${Date.now()}_${file.originalname}`;
      cb(null, fileName);
    },
  }),
});

export default uploadS3;
