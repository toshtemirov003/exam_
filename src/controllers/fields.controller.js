import { read } from "../utils/model.js";

export let CATEGORIES = (req, res) => {
  try {
    let categories = read("category");

    res
      .status(200)
      .json({ status: 200, message: "Categories", data: categories });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

export let SUBCATEGORIES = (req, res) => {
  try {
    let subcategories = read("subcategory");

    res
      .status(200)
      .json({ status: 200, message: "Subcategories", data: subcategories });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

export let FULL_NAMES = (req, res) => {
  try {
    let posts = read("posts");

    let fullNames = [];

    for (const post of posts) {
      fullNames.push(post.user.fullname);
    }

    res
      .status(200)
      .json({ status: 200, message: "Fullnames", data: fullNames });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};
