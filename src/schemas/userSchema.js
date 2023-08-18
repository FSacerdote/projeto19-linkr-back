import Joi from "joi";

export const userSchema = Joi.object({
  email: Joi.string().email().trim().min(5).required(),
  password: Joi.string().min(6).required()
})