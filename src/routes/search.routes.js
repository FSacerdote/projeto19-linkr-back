import { Router } from "express";
import {
  getUserInfo,
  getUserPosts,
  getUsersList,
} from "../controllers/search.controller.js";

const searchRoute = Router();

searchRoute.get("/users/:username", getUsersList);
searchRoute.get("/:id/posts", getUserPosts);
searchRoute.get("/:id/user", getUserInfo);

export default searchRoute;
