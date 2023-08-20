import { Router } from "express";
import {
  getTrending,
  getHashtagPosts,
} from "../controllers/hashtags.controller.js";
import { validateAuth } from "../middlewares/validateAuth.js";

const hashtagsRouter = Router();

hashtagsRouter.get("/hashtags/trending", validateAuth, getTrending);
hashtagsRouter.get("/hashtag/:hashtag", validateAuth, getHashtagPosts);

export default hashtagsRouter;
