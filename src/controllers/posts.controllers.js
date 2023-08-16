import { getPostsQuery, insertPost } from "../repositories/posts.repository.js";

export async function newPost(req, res) {
  const { url, description } = req.body;
  const { userId } = res.locals;
  try {
    await insertPost(userId, url, description);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send("An error occurred while creating a new post");
  }
}

export async function getPosts(req, res) {
  try {
    const posts = await getPostsQuery();
    res.send(posts.rows);
  } catch (error) {
    res.status(500).send("An error occurred while getting the posts");
  }
}
