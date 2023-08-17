import { Router } from "express";
import {
  dislikePost,
  getLikes,
  likePost,
} from "../controllers/likes.controller.js";
import { validateAuth } from "../middlewares/validateAuth.js";

const likesRouter = Router();

likesRouter.post("/like/:postId", validateAuth, likePost);
likesRouter.delete("/like/:postId", validateAuth, dislikePost);
likesRouter.get("/post/:postId/likes", validateAuth, getLikes);

export default likesRouter;
