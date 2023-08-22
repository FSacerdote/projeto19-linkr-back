import {
  getCommentsFromPost,
  insertCommentIntoPost,
} from "../repositories/comments.repository.js";

export async function getComments(req, res) {
  const { postId } = req.params;
  try {
    const query = await getCommentsFromPost(postId);
    const comments = query.rows;
    const countComments = query.rowCount;
    const resp = {
      countComments,
      comments,
    };

    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function newComment(req, res) {
  const { postId } = req.params;
  const { userId } = res.locals;
  const { text } = req.body;
  try {
    const query = await insertCommentIntoPost(postId, userId, text);

    res.status(201);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function deleteComment(req, res) {
  const { postId } = req.params;
  const { userId } = res.locals;
  const { text } = req.body;
  try {
    const query = await insertCommentIntoPost(postId, userId, text);

    res.status(201);
  } catch (error) {
    res.status(500).send(error);
  }
}
