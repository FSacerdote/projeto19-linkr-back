import { Router } from "express";
import likesRouter from "./likes.routes.js";

const router = Router();

router.use(likesRouter);

export default router;
