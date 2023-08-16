import { Router } from "express";
import userRoute from "./user.routes.js";

import searchRoute from "./search.routes.js";

const router = Router();

router.use(userRoute);

router.use(searchRoute);

export default router;
