const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    //cloud-name, api_key, api_secret are by default these names should be used
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV', //this folder will be created in cloudinary platform of your account
      allowedFormats: ["png", "jpg", "jpeg"],
    },
});

module.exports = {
    cloudinary, storage
};