const Multer = require('multer');
const multerGoogleStorage  = require('multer-google-storage');
// const { Storage } = require('@google-cloud/storage');

const multer = Multer({
  storage: multerGoogleStorage.storageEngine({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    projectId: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    bucket: process.env.GCLOUD_STORAGE_BUCKET
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

const transformFileModel = file => ({
  fieldName: file.fieldname,
  originalName: file.originalname,
  encoding: file.encoding,
  mimeType: file.mimetype,
  path: file.path,
  fileName: file.filename
})

/**
 * @return Array<function>
 */
module.exports.createSingleUploadFileMiddleware = ({ fieldName = 'file' }) => [
  /**
   * In the next middlware you will have the object `req.file`
   * The library `multer` will construct the object `req.file` like below
   * {
      "fieldname": "file",
      "originalname": "ORIGINALNAME",
      "encoding": "7bit",
      "mimetype": "image/png",
      "path": "https://time-bucket.storage.googleapis.com/FILENAME",
      "filename": "FILENAME"
    }
  */
  multer.single(fieldName),
  /**
   * Unify the file object model
   */
  (req, res, next) => {
    req.file = transformFileModel(req.file);
    next();
  }
];

/**
 * @return Array<function>
 */
module.exports.createMultipleUploadFileMiddleware = fileOptions => {
  if (fileOptions.__proto__ === Object.prototype) {
    const { fieldName, maxCount } = fileOptions;
    return [
      multer.array(fieldName, maxCount),
      (req, res, next) => {
        req.files = req.files.map(transformFileModel);
        next();
      }
    ];
  }

  return [
    multer.fields(fileOptions),
    (req, res, next) => {
      fileOptions.map(({ name }) => {
        req.files[name] = req.files[name].map(transformFileModel)
      });
      next();
    }
  ];
};