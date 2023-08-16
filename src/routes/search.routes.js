import { Router } from "express";
import { getUsersList } from "../controllers/search.controller.js";

const searchRoute = Router();

searchRoute.get("/user/:username", getUsersList);

export default searchRoute;
