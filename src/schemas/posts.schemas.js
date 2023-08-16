import joi from "joi";

export const postSchema = joi.object({
  url: joi.string().uri().required(),
  description: joi.string().allow("").required().max(255),
});
