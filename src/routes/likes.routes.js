import { Router } from "express";
import {
  dislikePost,
  getLikes,
  likePost,
} from "../controllers/likes.controller";
import { validateAuth } from "../middlewares/validateAuth";

const likesRouter = Router();


likesRouter.post("/like/:postId", validateAuth, likePost);
likesRouter.delete("/like/:postId", validateAuth, dislikePost);
likesRouter.get("/post/:postId/likes", validateAuth, getLikes);

export default likesRouter;
