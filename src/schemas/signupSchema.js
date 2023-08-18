import Joi from "joi"

export const signupSchema = Joi.object({
  username: Joi.string().min(3).trim().required(),
  pictureUrl:Joi.string().uri().required(),
  email: Joi.string().email().trim().min(5).required(),
  password: Joi.string().min(6).required()

})