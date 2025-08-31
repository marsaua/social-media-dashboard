import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const handleAvatarUpload = upload.single("avatar");

export default handleAvatarUpload;
