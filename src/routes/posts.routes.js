import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth.js";

const postsRouter = Router();

postsRouter.post("/posts", validateAuth);
postsRouter.get("/posts", validateAuth);
postsRouter.get("/teste", validateAuth);

export default postsRouter;
