import { db } from "../database/database.connection.js";
import { getPostsQuery, insertPost } from "../repositories/posts.repository.js";

export async function newPost(req, res) {
  const { url, description } = req.body;
  const { userId } = res.locals;
  const hashtagRegex = /#\w+/g;
  const hashtags = description.match(hashtagRegex)?.map((tag) => tag.slice(1));
  try {
    const post = await insertPost(userId, url, description);
    const postId = post.rows[0].id;
    if (hashtags) {
      for (const hashtag of hashtags) {
        let tag = await db.query(`SELECT * FROM hashtags WHERE name=$1;`, [
          hashtag,
        ]);
        if (tag.rowCount === 0) {
          tag = await db.query(
            `INSERT INTO hashtags (name) VALUES ($1) RETURNING id;`,
            [hashtag]
          );
        }
        const tagId = tag.rows[0].id;
        await db.query(
          `INSERT INTO "postHashtag" ("postId", "hashtagId") VALUES ($1, $2);`,
          [postId, tagId]
        );
      }
    }
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getPosts(req, res) {
  try {
    const resposta = await getPostsQuery();
    const posts = resposta.rows;
    res.send(posts);
  } catch (error) {
    res.status(500).send("An error occurred while getting the posts");
  }
}
