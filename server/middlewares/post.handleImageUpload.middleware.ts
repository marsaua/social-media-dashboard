import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const handlePostImageUpload = upload.single("image");

export default handlePostImageUpload;
