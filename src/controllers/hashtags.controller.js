import getMetaData from "metadata-scraper";
import {
  getHashtagsByFrequency,
  getPostsByHashtag,
} from "../repositories/hashtags.repository.js";

export async function getTrending(req, res) {
  const { limit } = req.query;

  try {
    const trending = await getHashtagsByFrequency(parseInt(limit));
    res.send(trending);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function getHashtagPosts(req, res) {
  const hashtag = req.params.hashtag;
  const { offset, limit } = req.query;

  try {
    const posts = await getPostsByHashtag(hashtag, offset, limit);
    const postsWithMeta = [];

    for (const post of posts) {
      const data = await getMetaData(post.url);
      postsWithMeta.push({ ...post, data });
    }

    res.send(postsWithMeta);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
