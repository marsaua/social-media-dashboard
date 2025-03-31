import express from "express";

import createPost from "controllers/posts/createPost.controller.ts";
import getPosts from "controllers/posts/getPosts.controller.ts";
import getPost from "controllers/posts/getPost.controller.ts";
import updatePost from "controllers/posts/updatePost.controller.ts";
import deletePost from "controllers/posts/deletePost.controller.ts";
import handlePostImageUpload from "middlewares/post.handleImageUpload.middleware.ts";

const router = express.Router();

router.post("/", handlePostImageUpload, createPost);
router.get("/user/:userId", getPosts);
router
  .route("/:postId")
  .get(getPost)
  .patch(handlePostImageUpload, updatePost)
  .delete(deletePost);

export default router;
