import jwt from "jsonwebtoken";

export async function validateAuth(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    res.locals.userId = data.id;

    next();
  } catch (error) {
    return res.sendStatus(401);
  }
}
