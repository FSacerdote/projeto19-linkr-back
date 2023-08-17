import getMetaData from "metadata-scraper";
import { db } from "../database/database.connection.js";
import {
  editPost,
  getHashtag,
  getPostById,
  getPostsQuery,
  insertHashtag,
  insertPost,
  insertPostHashtag,
} from "../repositories/posts.repository.js";

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
        let tag = await getHashtag(hashtag);
        if (tag.rowCount === 0) {
          tag = await insertHashtag(hashtag);
        }
        const tagId = tag.rows[0].id;
        await insertPostHashtag(postId, tagId);
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
    const final = [];
    for (const post of posts) {
      const data = await getMetaData(post.url);
      final.push({ ...post, data });
    }
    res.send(final);
  } catch (error) {
    res.status(500).send("An error occurred while getting the posts");
  }
}

export async function editPosts(req, res) {
  const { description } = req.body;
  const { postId } = req.params;
  const { userId } = res.locals;
  console.log(description);
  console.log(postId);
  console.log(userId);
  const hashtagRegex = /#\w+/g;
  const hashtags = description.match(hashtagRegex)?.map((tag) => tag.slice(1));

  try {
    const existingPost = await getPostById(postId);
    if (!existingPost) {
      return res.status(404).send("Post não encontrado");
    }

    if (existingPost.rows[0].userId !== userId) {
      return res
        .status(403)
        .send("Você não tem permissão para editar este post");
    }

    const post = await editPost(description, postId, userId);

    if (hashtags) {
      for (const hashtag of hashtags) {
        let tag = await getHashtag(hashtag);
        if (tag.rowCount === 0) {
          tag = await insertHashtag(hashtag);
        }
        const tagId = tag.rows[0].id;
        await insertPostHashtag(postId, tagId);
      }
    }

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
  }
}
