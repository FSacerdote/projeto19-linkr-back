import joi from "joi";

export const commentSchema = joi.object({
  text: joi.string().allow("").required().max(255),
});
