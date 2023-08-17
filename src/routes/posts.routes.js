import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth.js";
import { validateSchema } from "../middlewares/validate.schema.js";
import { postSchema } from "../schemas/posts.schemas.js";
import {
  deletePost,
  editPosts,
  getPosts,
  newPost,
} from "../controllers/posts.controllers.js";

const postsRouter = Router();

postsRouter.post("/posts", validateAuth, validateSchema(postSchema), newPost);
postsRouter.get("/posts", validateAuth, getPosts);
postsRouter.put(
  "/posts/edit/:postId",
  validateAuth,
  validateSchema(postSchema),
  editPosts
);
postsRouter.delete("/posts/delete/:postId", validateAuth, deletePost);

export default postsRouter;
