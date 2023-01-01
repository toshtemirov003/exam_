import { Router } from "express";
import { validatePost } from "../middleware/post.middleware.js";
import { checkToken } from "../utils/token.js";
import {
  ACTIVE_USER,
  GET_ACTIVE,
  GET_POST,
  GET_REJECTED,
  REJECT_USER,
  LOGIN,
} from "../controllers/admin.controller.js";

const adminRoute = Router();

adminRoute.get("/get-post", checkToken, GET_POST);
adminRoute.get("/get-rejected", checkToken, GET_REJECTED);
adminRoute.get("/get-active", checkToken, GET_ACTIVE);
adminRoute.get("/active-users/:postId", checkToken, ACTIVE_USER);
adminRoute.get("/reject-user/:postId", checkToken, REJECT_USER);

adminRoute.post("/login", validatePost, LOGIN);

export default adminRoute;
