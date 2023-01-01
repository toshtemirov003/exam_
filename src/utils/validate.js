import Joi from "joi";

export const signSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
});

export const postSchema = Joi.object({
  title: Joi.string().min(5).max(70).required(),
  description: Joi.string().min(10).max(500).required(),
  text: Joi.string().min(5).required(),
  category: Joi.string().min(0).max(30).required(),
  subcategory: Joi.string().min(0).required(),
  fullname: Joi.string().min(8).required(),
  type: Joi.string().min(2).required(),
  job: Joi.string().min(0).required(),
  dateYear: Joi.string().min(2).required(),
  dateHour: Joi.string().min(2).required(),
  phone: Joi.string().min(7).required(),
  postImg: Joi.string().pattern(new RegExp(/\.(gif|jpe?g|png|webp)$/i)),
});
