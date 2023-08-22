import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth.js";
import { validateSchema } from "../middlewares/validate.schema.js";
import { postSchema } from "../schemas/posts.schemas.js";
import { getComments } from "../controllers/comments.controller.js";

const commentsRouter = Router();

/* commentsRouter.post(
  "/post/:postId/comment",
  validateAuth,
  validateSchema(postSchema),
  newPost
); */
commentsRouter.get("/post/:postId/comments", validateAuth, getComments);
/* commentsRouter.put(
  "/post/:postId/comment",
  validateAuth,
  validateSchema(postSchema),
  editPosts
);
commentsRouter.delete("/posts/:postId/comment", validateAuth, deletePost);
 */
export default commentsRouter;
