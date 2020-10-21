const express = require('express');
const router = express.Router();

const uploadImageController = require('./upload-image.controller');
const { createSingleUploadFileMiddleware, createMultipleUploadFileMiddleware } = rootRequire('/externals/storage/');

const uploadSingleImageMiddleware = createSingleUploadFileMiddleware({
  fieldName: 'image',
  mimetype: ['image/png', 'image/jpg', 'image/jpeg'],
  fileSize: 5 * 1024 * 1024
});
router.post('/single', uploadSingleImageMiddleware, uploadImageController.postSingleImage);

const uploadArrayOfImagesMiddleware = createMultipleUploadFileMiddleware({
  fieldName: 'images',
  mimetype: ['image/png', 'image/jpg', 'image/jpeg'],
  fileSize: 5 * 1024 * 1024,
  maxCount: 8
});
router.post('/array', uploadArrayOfImagesMiddleware, uploadImageController.postArrayOfImages);

const uploadMultipleImageMiddleware = createMultipleUploadFileMiddleware({
  fields: [
    { name: 'avatar', maxCount: 1, mimetype: ['image/png', 'image/jpg', 'image/jpeg'] },
    { name: 'gallery', maxCount: 8, mimetype: ['image/png', 'image/jpg', 'image/jpeg']
  }],
  fileSize: 5 * 1024 * 1024
});
router.post('/multiple', uploadMultipleImageMiddleware, uploadImageController.postMultipleImage);

module.exports = router;