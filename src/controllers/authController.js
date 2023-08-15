import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  createUserDb,
  getUserByEmailDb,
} from "../repositories/user.repository.js";

export async function signup(req, res) {
  const { username, email, password, pictureUrl } = req.body;

  try {
    const user = await getUserByEmailDb(email);
    if (user.rowCount > 0) return res.status(409).send("E-mail já cadastrado.");

    const hash = bcrypt.hashSync(password, 10);
    await createUserDb(username, email, hash, pictureUrl);

    res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function signin(req, res) {
  const tokenExpirationSeconds = 60 * 60 * 24 * 30;
  const { email, password } = req.body;

  try {
    const foundUser = await getUserByEmailDb(email);
    if (!foundUser.rowCount) {
      return res.sendStatus(401);
    }
    if (bcrypt.compareSync(password, foundUser.rows[0].password)) {
      const token = jwt.sign(
        {
          email,
          utcOffset: foundUser.rows[0].utcOffset,
          id: foundUser.rows[0].id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: tokenExpirationSeconds,
        }
      );
      return res.status(200).send({ name: foundUser.rows[0].username, token });
    }
    return res.sendStatus(401);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
