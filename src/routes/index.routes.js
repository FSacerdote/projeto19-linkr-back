import { Router } from "express";
import likesRouter from "./likes.routes.js";
import userRoute from "./user.routes.js";
import hashtagsRouter from "./hashtags.routes.js";
import searchRoute from "./search.routes.js";

const router = Router();

router.use(likesRouter);
router.use(userRoute);
router.use(hashtagsRouter);
router.use(searchRoute);

export default router;
