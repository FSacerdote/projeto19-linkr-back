import {
  getPostsByUserId,
  getUsersByUsername,
} from "../repositories/search.repository.js";

export async function getUsersList(req, res) {
  const { username } = req.params;

  try {
    const usersFound = await getUsersByUsername(username);

    if (!usersFound.rows[0]) return res.sendStatus(404);

    return res.send(usersFound.rows).status(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getUserPosts() {
  const { id } = req.params;

  try {
    const postsFound = await getPostsByUserId(id);

    if (!postsFound.rows[0]) return res.sendStatus(404);

    return res.send(postsFound.rows).status(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
