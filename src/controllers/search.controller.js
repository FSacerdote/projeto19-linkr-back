import {
  getPostsByUserId,
  getUserById,
  getUsersByUsername,
} from "../repositories/search.repository.js";

export async function getUsersList(req, res) {
  const { username } = req.params;

  try {
    const usersFound = await getUsersByUsername(username);

    return res.send(usersFound.rows).status(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getUserPosts(req, res) {
  const { id } = req.params;

  try {
    const postsFound = await getPostsByUserId(id);
    
    return res.send(postsFound.rows).status(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getUserInfo(req, res) {
  const { id } = req.params;

  try {
    const userFound = await getUserById(id);

    if (!userFound.rows[0]) return res.sendStatus(404);

    return res.send(userFound.rows[0]).status(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
