import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth.js";
import { validateSchema } from "../middlewares/validate.schema.js";
import { postSchema } from "../schemas/posts.schemas.js";
import {
  deletePost,
  editPosts,
  getPosts,
  newPost,
  repost,
} from "../controllers/posts.controllers.js";

const postsRouter = Router();

postsRouter.post("/posts", validateAuth, validateSchema(postSchema), newPost);
postsRouter.post("/repost/:postId", validateAuth, repost);
postsRouter.get("/posts", validateAuth, getPosts);
postsRouter.put(
  "/posts/edit/:postId",
  validateAuth,
  validateSchema(postSchema),
  editPosts
);
postsRouter.delete("/posts/delete/:postId", validateAuth, deletePost);

export default postsRouter;
