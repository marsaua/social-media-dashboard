import express from "express";

import updateUser from "controllers/users/updateUser.controller.ts";
import getCurrentUser from "controllers/users/getCurrentUser.controller.ts";
import getAllUsers from "controllers/users/getAllUsers.controller.ts";
import handleAvatarUpload from "middlewares/user.handleAvatarUpload.middleware.ts";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/current", getCurrentUser);
router.patch("/:userId", handleAvatarUpload, updateUser);

export default router;
