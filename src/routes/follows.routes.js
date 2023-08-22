import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth.js";
import {
  follow,
  unfollow,
  verifyFollower,
} from "../controllers/follows.controllers.js";

const followsRouter = Router();

followsRouter.post("/follows", validateAuth, follow);
followsRouter.delete("/follows/:followedId", validateAuth, unfollow);
followsRouter.get("/follows/:followedId", validateAuth, verifyFollower);

export default followsRouter;
