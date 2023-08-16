import { db } from "../database/database.connection.js";

export function selectLikes(userId, postId) {
  return db.query(`SELECT * FROM likes WHERE "userId" = $1 AND "postId" = $2`, [
    userId,
    postId,
  ]);
}

export function insertIntoLike(userId, postId) {
  return db.query(`INSERT INTO likes ("userId", "postId") VALUES ($1, $2)`, [
    userId,
    postId,
  ]);
}

export function deleteLike(userId, postId) {
  return db.query(`DELETE FROM likes WHERE "userId" = $1 AND "postId" = $2`, [
    userId,
    postId,
  ]);
}

export function selectCountLikes(postId) {
  return db.query(
    `SELECT COUNT(*) AS "likeCount" FROM likes WHERE "postId" = $1`,
    [postId]
  );
}

export function selectUsersFromLiked(postId) {
  return db.query(`SELECT "userId" FROM likes WHERE "postId" = $1`, [postId]);
}
