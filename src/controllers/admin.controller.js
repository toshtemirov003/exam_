import crypto from "crypto";
import { read, write } from "../utils/model.js";
import jwt from "../utils/jwt.js";

export const GET_POST = (req, res) => {
  try {
    let posts = read("posts");

    let filteredPost = posts.filter((post) => post.status == "result");

    res.status(200).json({ status: 200, data: filteredPost });
  } catch (error) {
    res.status(403).json({ status: 403, message: error.message });
  }
};

export const GET_REJECTED = (req, res) => {
  try {
    let posts = read("posts");

    let filteredPost = posts.filter((post) => post.status == "rejected");

    res.status(200).json({ status: 200, data: filteredPost });
  } catch (error) {
    res.status(403).json({ status: 403, message: error.message });
  }
};

export const GET_ACTIVE = (req, res) => {
  try {
    let posts = read("posts");

    let filteredPost = posts.filter((post) => post.status == "active");

    res.status(200).json({ status: 200, data: filteredPost });
  } catch (error) {
    res.status(403).json({ status: 403, message: error.message });
  }
};

export const ACTIVE_USER = (req, res) => {
  try {
    let posts = read("posts");
    let { postId } = req.params;
    let findedPost = posts.find((post) => post.postId == postId);

    if (findedPost.status == "result") {
      findedPost.status = "active";

      write("posts", posts);
      res.status(200).json({ status: 200, data: findedPost });
    } else {
      res.status(400).json({ status: 400, message: "post not in result" });
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

export const REJECT_USER = (req, res) => {
  try {
    let posts = read("posts");
    let { postId } = req.params;

    let findedPost = posts.find((post) => post.postId == postId);
    if (findedPost.status == "result") {
      findedPost.status = "rejected";

      write("posts", posts);
      res.status(200).json({ status: 200, data: findedPost });
    } else {
      res.status(400).json({ status: 400, message: "post not in result" });
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

export const LOGIN = (req, res) => {
  try {
    let admins = read("admins");
    let { username, password } = req.body;

    password = crypto.createHash("sha256").update(password).digest("hex");

    let findAdmin = admins.find(
      (user) => user.username == username && user.password == password
    );

    if (!findAdmin) {
      throw new Error("user not found");
    }

    res.status(200).send({ status: 200, token: jwt.sign(findAdmin.adminId) });
  } catch (error) {
    res.status(404).send({ status: 404, message: error.message });
  }
};
