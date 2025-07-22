const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
import cloudinary from '../config/cloudinaryConfig'


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'your_folder_name',
    resource_type: 'auto',
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'],
  },
});

const upload = multer({ storage: storage });

export default upload;