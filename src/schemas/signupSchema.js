import Joi from "joi"

export const signupSchema = Joi.object({
  username: Joi.string().required(),
  pictureUrl:Joi.string().uri().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(3)

})