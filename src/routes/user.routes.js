import { Router } from "express";
import { validateSchema } from "../middlewares/validate.schema.js";
import { signupSchema } from "../schemas/signupSchema.js";
import { signin, signup } from "../controllers/authController.js";
import { userSchema } from "../schemas/userSchema.js";

const userRoute = Router();

userRoute.post("/signup", validateSchema(signupSchema), signup);
userRoute.post("/signin", validateSchema(userSchema), signin);

export default userRoute;
