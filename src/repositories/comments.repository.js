import { db } from "../database/database.connection.js";

export function getCommentsFromPost(postId) {
  return db.query(
    `SELECT comments."postId", comments."userId", users.username, comments.text FROM "comments"
	JOIN users ON users.id = comments."userId"
	JOIN posts ON posts.id = comments."postId"
	WHERE comments."postId" = $1;`,
    [postId]
  );
}

export function selectCountCommentsFromPost(postId) {
  return db.query(
    `SELECT comments."postId", comments."userId", users.username, comments.text FROM "comments"
        JOIN users ON users.id = comments."userId"
        JOIN posts ON posts.id = comments."postId"
        WHERE comments."postId" = $1;`,
    [postId]
  );
}
