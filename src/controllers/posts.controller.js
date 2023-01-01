import { read, write } from "../utils/model.js";
import fs from "fs";
import path from "path";

export const NEW_POST = (req, res) => {
  try {
    let posts = read("posts");
    let {
      dateYear,
      dateHour,
      job,
      category,
      subcategory,
      type,
      fullname,
      phone,
      description,
      title,
      text,
    } = req.body;

    let { postImg } = req.files;

    let postImgName = Date.now() + postImg.name;

    fs.writeFileSync(
      path.resolve("uploads", postImgName),
      postImg.data,
      "utf-8"
    );

    let newPost = {
      title,
      text,
      description,
      dateYear,
      dateHour,
      category,
      subcategory,
      type,
      postImg: postImgName,
      isDeleted: false,
      status: "result",
      count: 0,
      postId: posts.at(-1)?.postId + 1 || 1,
      user: {
        fullname,
        phone,
        job,
      },
      watched: [],
    };

    posts.push(newPost);

    write("posts", posts);

    res
      .status(201)
      .json({ status: 201, message: "new post added", date: newPost });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

export const GET_POST = (req, res) => {
  try {
    let posts = read("posts");

    let { category, type, dateYear, fullname } = req.query;

    posts = posts.filter((post) => post.status == "active");

    let filteredPostRes = posts.filter((post) => {
      let postCategory = category ? post.category == category : true;
      let postType = type ? post.type == type : true;
      let postDate = dateYear ? post.dateYear == dateYear : true;
      let postFullName = fullname ? post.user.fullname == fullname : true;

      return postCategory || postType || postDate || postFullName;
    });

    for (const res of filteredPostRes) {
      delete res.watched;
    }

    res
      .status(200)
      .json({ status: 200, message: "posts", data: filteredPostRes });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

export const GET_INNER_POST = (req, res) => {
  try {
    let posts = read("posts");

    let { postId } = req.params;
    let ip = req.ip;

    let findedPost = posts.find((post) => post.postId == postId);

    if (findedPost.status == "result" || findedPost.status == "rejected") {
      throw new Error("This post waiting to activation");
    }

    if (!findedPost.watched.find((watch) => watch == ip)) {
      findedPost.count = +findedPost.count + 1;
      findedPost.watched.push(ip);
      write("posts", posts);
    }

    if (!findedPost) {
      throw new Error("Post not found 404");
    }

    delete findedPost.watched;

    res
      .status(200)
      .json({ status: 200, message: "post finded", data: findedPost });
  } catch (error) {
    res.status(404).json({ status: 404, message: "Post not found" });
  }
};

export const GET_IMAGE = (req, res) => {
  try {
    let { imgName } = req.params;

    let uploadImg = fs.readFileSync(path.resolve("uploads", imgName), "utf-8");

    if (!uploadImg) {
      throw new Error("Img not found");
    }

    res.status(200).sendFile(path.resolve("uploads", imgName), uploadImg);
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

export const DOWNLOAD_IMG = (req, res) => {
  try {
    let { imgName } = req.params;

    let uploadImg = fs.readFileSync(path.resolve("uploads", imgName), "utf-8");

    if (!uploadImg) {
      throw new Error("Image not found");
    }

    res.status(200).download(path.resolve("uploads", imgName));
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};
