const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
const logger = require("../config/logger");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = {
  uploadImage: async function (file) {
    try {
      let res = await cloudinary.uploader.upload(file, {
        folder: process.env.CLOUDINARY_FOLDER_NAME,
      });
      return res.secure_url;
    } catch (error) {
      console.log({ error });
      logger.error(error);
    }
  },
};
