import { Router } from "express";
import likesRouter from "./likes.routes.js";
import userRoute from "./user.routes.js";
import postsRouter from "./posts.routes.js";
import hashtagsRouter from "./hashtags.routes.js";
import searchRoute from "./search.routes.js";
import commentsRouter from "./comments.routes.js";
import followsRouter from "./follows.routes.js";
const router = Router();

router.use(likesRouter);
router.use(userRoute);
router.use(postsRouter);
router.use(hashtagsRouter);
router.use(searchRoute);
router.use(commentsRouter);
router.use(followsRouter);

export default router;
