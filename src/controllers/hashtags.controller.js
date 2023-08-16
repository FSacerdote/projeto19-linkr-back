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

  try {
    const posts = await getPostsByHashtag(hashtag);
    res.send(posts);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
