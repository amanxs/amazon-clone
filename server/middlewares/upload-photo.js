//Multer is a node.js middleware for handling multipart/form-data, whcih is primarily used for uploading files.
 //It is written on top of busboy for max efficiency

 const aws = require('aws-sdk');
 const multer = require('multer');
 const multerS3 = require('multer-s3');

 aws.config.update({
     secretAccessKey: process.env.AWSSecretKey,
     accessKeyId: process.env.AWSAccessKeyId
 });

 const s3 = new aws.S3();

 const upload = multer({
     storage: multerS3({
         s3: s3,
         bucket: 'abhilasha-v1',
         acl: 'public-read',
         metadata: (req, file, cb) => {
             cb(null, {fieldName: file.fieldname})// cb is the callback function
         },
         key: (req, file, cb) => {
             cb(null, Date.now().toString())// Key can be anything when you upload the photo. We have just used Date and the value will be the name of the file
         }
     })
 });

 module.exports = upload;