import { Router } from "express";
import likesRouter from "./likes.routes.js";
import userRoute from "./user.routes.js";

const router = Router();

router.use(likesRouter);
router.use(userRoute);

export default router;
