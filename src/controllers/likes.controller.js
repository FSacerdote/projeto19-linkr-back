import {
  deleteLike,
  insertIntoLike,
  selectCountLikes,
  selectLikes,
  selectUsersFromLiked,
} from "../repositories/likes.repository.js";

export async function likePost(req, res) {
  const { postId } = req.params;
  const { userId } = res.locals;
  try {
    const existingLike = await selectLikes(userId, postId);

    if (existingLike.rowCount > 0) {
      return res
        .status(409)
        .send({ message: "Post already liked by this user" });
    }
    await insertIntoLike(userId, postId);
    res.status(201).send("Post liked successfully");
  } catch (err) {
    res.status(500).send("An error occurred while liking the post");
  }
}

export async function dislikePost(req, res) {
  const { postId } = req.params;
  const { userId } = res.locals;
  try {
    const existingLike = await selectLikes(userId, postId);

    if (!existingLike.rowCount === 0) {
      return res.status(409).send({ message: "Post not liked by this user" });
    }
    await deleteLike(userId, postId);
    res.status(201).send("Post disliked successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while disliking the post");
  }
}

export async function getLikes(req, res) {
  const { postId } = req.params;
  try {
    const likesQuery = await selectCountLikes(postId);
    const likedUsersQuery = await selectUsersFromLiked(postId);

    const likeCount = likesQuery.rows[0].likeCount;
    const likedUsers = likedUsersQuery.rows;

    const likesFromPost = {
      likeCount,
      likedUsers,
    };

    res.status(200).send(likesFromPost);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
