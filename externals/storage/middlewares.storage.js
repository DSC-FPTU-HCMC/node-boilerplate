const multer = require('multer');
const multerGoogleStorage  = require('multer-google-storage');
// const { Storage } = require('@google-cloud/storage');

const transformFileModel = file => ({
  fieldName: file.fieldname,
  originalName: file.originalname,
  encoding: file.encoding,
  mimeType: file.mimetype,
  path: file.path,
  fileName: file.filename
})

const createUpload = ({ fileSize, validMimetype }) => multer({
  storage: multerGoogleStorage.storageEngine({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    projectId: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    bucket: process.env.GCLOUD_STORAGE_BUCKET
  }),
  limits: {
    fileSize: fileSize || 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (validMimetype(file))
      return cb(null, true);

    return cb(
      new Error(`FILE_UPLOAD: mimetype ${file.mimetype} is not allowed!`),
      false
    );
  }
})

/**
 * @return Array<function>
 */
module.exports.createSingleUploadFileMiddleware = ({ fieldName = 'file', mimetype, fileSize }) => {
  const upload = createUpload({
    mimetype,
    fileSize,
    validMimetype: file => mimetype.include(file.mimetype)
  });

  return [
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
    upload.single(fieldName),
    /**
     * Unify the file object model
     */
    (req, res, next) => {
      req.file = transformFileModel(req.file);
      next();
    }
  ]
};

/**
 * @return Array<function>
 */
module.exports.createMultipleUploadFileMiddleware = (fileOptions) => {
  if (fileOptions.fieldName) {
    const { fieldName, maxCount, mimetype, fileSize } = fileOptions;
    const upload = createUpload({
      mimetype: mimetype,
      fileSize: fileSize,
      validMimetype: file => mimetype.include(file.mimetype)
    });
    return [
      upload.array(fieldName, maxCount),
      (req, res, next) => {
        req.files = req.files.map(transformFileModel);
        next();
      }
    ];
  }

  // TODO: valid mimetype by field
  // the validMimetype function below is not working properly
  // TODO: fix maxCount not return error response
  const upload = createUpload({
    mimetype: fileOptions.mimetype,
    fileSize: fileOptions.fileSize,
    validMimetype: file => fileOptions.fields
      .find(field => field.name === file.fieldname)
      .mimetype
      .includes(file.mimetype)
  });
  return [
    upload.fields(fileOptions.fields),
    (req, res, next) => {
      fileOptions.fields.map(({ name }) => {
        req.files[name] = req.files[name].map(transformFileModel)
      });
      next();
    }
  ];
};