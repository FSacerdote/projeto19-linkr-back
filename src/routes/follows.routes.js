import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth.js";
import { follow, unfollow } from "../controllers/follows.controllers.js";

const followsRouter = Router();

followsRouter.post("/follows", validateAuth, follow);
followsRouter.delete("/follows", validateAuth, unfollow);

export default followsRouter;
