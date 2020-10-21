const express = require('express');
const router = express.Router();

const uploadImageController = require('./upload-image.controller');
const { createSingleUploadFileMiddleware, createMultipleUploadFileMiddleware } = rootRequire('/externals/storage/');

const uploadSingleImageMiddleware = createSingleUploadFileMiddleware({ fieldName: 'image', mimetype: '' });
router.post('/single', uploadSingleImageMiddleware, uploadImageController.postSingleImage);

const uploadArrayOfImagesMiddleware = createMultipleUploadFileMiddleware({ fieldName: 'images', mimetype: '' });
router.post('/array', uploadArrayOfImagesMiddleware, uploadImageController.postArrayOfImages);

const uploadMultipleImageMiddleware = createMultipleUploadFileMiddleware([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]);
router.post('/multiple', uploadMultipleImageMiddleware, uploadImageController.postMultipleImage);

module.exports = router;