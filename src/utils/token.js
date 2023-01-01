import jwt from "jsonwebtoken";
const SECRET_KEY = "apple";

function checkToken(req, res, next) {
  try {
    let { token } = req.headers;

    if (!token) {
      throw new Error("token is required");
    }

    let { userId } = jwt.verify(token, SECRET_KEY);

    req.userId = userId;

    next();
  } catch (error) {
    res.status(401).json({
      status: 401,
      message: error.message,
    });
  }
}

export { SECRET_KEY, checkToken };
