import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import { PORT } from "./config.js";
import adminRoute from "./routes/admin.router.js";
import route from "./routes/categories.router.js";
import postsRoute from "./routes/posts.router.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());

// Routes
app.use(route);
app.use(adminRoute);
app.use(postsRoute);

app.listen(PORT, () =>
  console.log(`server is working http://localhost:${PORT}`)
);
