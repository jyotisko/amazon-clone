const cloudinary = require('cloudinary').v2;

module.exports = uploadImageToCloudinary = async (buffer, folder, fileName) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({
      resource_type: 'image',
      folder: folder,
      public_id: fileName
    }, (err, res) => {
      if (err) {
        console.log(err)
        reject(err);
      }
      if (res) resolve(res.url);
    }).end(buffer);
  });
};