import { Router } from "express";
import likesRouter from "./likes.routes.js";
import userRoute from "./user.routes.js";
import postsRouter from "./posts.routes.js";

const router = Router();

router.use(likesRouter);
router.use(userRoute);
router.use(postsRouter);

export default router;
