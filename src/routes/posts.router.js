import { Router } from "express";
import { validatePost } from "../middleware/post.middleware.js";
import {
  DOWNLOAD_IMG,
  GET_IMAGE,
  GET_INNER_POST,
  GET_POST,
  NEW_POST,
} from "../controllers/posts.controller.js";

let postsRoute = Router();

postsRoute.get("/get-posts", GET_POST);
postsRoute.get("/get-posts/:postId", GET_INNER_POST);
postsRoute.get("/get-img/:imgName", GET_IMAGE);
postsRoute.get("/download/:imgName", DOWNLOAD_IMG);

postsRoute.post("/post", validatePost, NEW_POST);

export default postsRoute;
