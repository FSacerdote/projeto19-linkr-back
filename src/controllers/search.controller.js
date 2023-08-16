import { getUsersByUsername } from "../repositories/user.repository.js";

export async function getUsersList(req, res) {
  const { username } = req.params;

  try {
    const usersFound = await getUsersByUsername(username);


    console.log(usersFound.rows[0]);

    if(!usersFound.rows[0])return res.sendStatus(404)

    return res.send(usersFound.rows).status(200);
  } catch (error) {
    return res.sendStatus(500);
  }
}
