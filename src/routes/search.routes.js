import { Router } from "express";
import {
  getUserInfo,
  getUserPosts,
  getUsersList,
} from "../controllers/search.controller.js";
import { validateAuth } from "../middlewares/validateAuth.js";

const searchRoute = Router();

searchRoute.get("/users/:username", validateAuth, getUsersList);
searchRoute.get("/:id/posts", validateAuth, getUserPosts);
searchRoute.get("/:id/user", validateAuth, getUserInfo);

export default searchRoute;
