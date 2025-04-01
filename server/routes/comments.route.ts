import express from "express";

import getComments from "controllers/comments/getComments.controller.ts";
import createComment from "controllers/comments/createComment.controller.ts";
import updateComment from "controllers/comments/updateComment.controller.ts";
import deleteComment from "controllers/comments/deleteComment.controller.ts";

const router = express.Router();

router.get("/:postId/comments", getComments);
router.post("/:postId/comments", createComment);
router.patch("/:postId/comments/:commentId", updateComment);
router.delete("/:postId/comments/:commentId", deleteComment);

export default router;
