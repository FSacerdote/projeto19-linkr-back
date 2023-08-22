import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth.js";

const followsRouter = Router();

followsRouter.post("/follows", validateAuth)
followsRouter.delete("/follows", validateAuth)

export default followsRouter