import { db } from "../database/database.connection.js";

export function getCommentsFromPost(postId) {
  return db.query(
    `SELECT comments.id, comments."postId", comments."userId", users.username, comments.text FROM "comments"
	JOIN users ON users.id = comments."userId"
	JOIN posts ON posts.id = comments."postId"
	WHERE comments."postId" = $1;`,
    [postId]
  );
}

export function insertCommentIntoPost(postId, userId, text) {
  return db.query(
    `INSERT INTO "comments" ("postId", "userId", "text") VALUES ($1, $2, $3);`,
    [postId, userId, text]
  );
}

export function deleteCommentFromPost(postId, userId, id) {
  return db.query(
    `DELETE FROM comments WHERE comments.id = $1 AND comments."postId" = $2 AND comments."userId" = $3;`,
    [id, postId, userId]
  );
}
