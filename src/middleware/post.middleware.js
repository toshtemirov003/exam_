import { postSchema, signSchema } from "../utils/validate.js";

export const validatePost = (req, res, next) => {
  try {
    if (req.url == "/sign" && req.method == "POST") {
      let validate = signSchema.validate(req.body);

      if (validate.error) throw new Error(validate.error);

      next();
    }
    if (req.url == "/post" && req.method == "POST") {
      let validate = postSchema.validate(req.body);

      if (validate.error) throw new Error(validate.error);

      next();
    }
  } catch (error) {
    res.status(400).send({ status: error.status, message: error.message });
  }
};
