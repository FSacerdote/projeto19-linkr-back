import {
  getCommentsFromPost,
  selectCountCommentsFromPost,
} from "../repositories/comments.repository.js";
import { selectCountLikes } from "../repositories/likes.repository.js";

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

    console.log(resp);

    res.status(200).send(resp);
  } catch (error) {
    res.status(500).send(error);
  }
}
