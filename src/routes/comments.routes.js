import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth.js";
import { validateSchema } from "../middlewares/validate.schema.js";
import {
  deleteComment,
  getComments,
  newComment,
} from "../controllers/comments.controller.js";
import { commentSchema } from "../schemas/comments.schemas.js";

const commentsRouter = Router();

commentsRouter.post(
  "/post/:postId/comment",
  validateAuth,
  validateSchema(commentSchema),
  newComment
);
commentsRouter.get("/post/:postId/comments", validateAuth, getComments);
/* commentsRouter.put(
  "/post/:postId/comment",
  validateAuth,
  validateSchema(postSchema),
  editPosts
);*/
commentsRouter.delete(
  "/post/:postId/comment/:commentId",
  validateAuth,
  deleteComment
);

export default commentsRouter;
