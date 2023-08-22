import {
  getPostsByUserId,
  getUserById,
  getUsersByUsername,
} from "../repositories/search.repository.js";
import getMetaData from "metadata-scraper";

export async function getUsersList(req, res) {
  const { username } = req.params;
  const { userId } = res.locals;
  try {
    const usersFound = await getUsersByUsername(username, userId);

    return res.send(usersFound.rows).status(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getUserPosts(req, res) {
  const { id } = req.params;
  const { offset, limit } = req.query;

  try {
    const postsFound = await getPostsByUserId(id, offset, limit);
    const postArr = [];

    for (const post of postsFound.rows) {
      try {
        const data = await getMetaData(post.url);
        postArr.push({ ...post, data });
      } catch (error) {
        console.log("erro ao coletar a metadata do link");
      }
    }

    return res.send(postArr).status(200);
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
