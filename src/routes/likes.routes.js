import { Router } from "express";
import {
  dislikePost,
  getLikes,
  likePost,
} from "../controllers/likes.controller";

const likesRouter = Router();

/* TO-DO 
    - adicionar validação nos endpoints
*/

likesRouter.post("/like/:postId", likePost);
likesRouter.delete("/like/:postId", dislikePost);
likesRouter.get("/post/:postId/likes", getLikes);

export default likesRouter;
