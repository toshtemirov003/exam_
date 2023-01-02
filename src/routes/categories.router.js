import { Router } from "express";
import {
  CATEGORIES,
  FULL_NAMES,
  SUBCATEGORIES,
} from "../controllers/categories.controller.js";

const route = Router();

route.get("/categories", CATEGORIES);

route.get("/subcategories", SUBCATEGORIES);

route.get("/fullname", FULL_NAMES);

export default route;
