module.exports.postSingleImage = (req, res) => {
  res.send({ image: req.file });
}

module.exports.postMultipleImage = (req, res) => {
  res.send({ images: req.files });
}

module.exports.postArrayOfImages = async (req, res) => {
  res.send({ images: req.files });
}