import { db } from "../database/database.connection.js";

export function insertPost(userId, url, description) {
  return db.query(
    `INSERT INTO posts ("userId", url, description) VALUES ($1, $2, $3) RETURNING id;`,
    [userId, url, description]
  );
}

export function getPostsQuery() {
  return db.query(
    `SELECT 
      p.id, 
      p."userId", 
      p.url, 
      p.description, 
      u.username, 
      u."pictureUrl",
      (SELECT COUNT(*) FROM likes l WHERE l."postId" = p.id) AS "likeCount",
      array_agg(json_build_object('userId', l."userId", 'username', u2.username)) AS "likedUsers"
    FROM posts p
    JOIN followers f ON p."userId" = f."followedId"
    JOIN users u ON p."userId" = u.id
    LEFT JOIN likes l ON p.id = l."postId"
    LEFT JOIN users u2 ON l."userId" = u2.id
    GROUP BY p.id, u.id
    ORDER BY p.id DESC 
    LIMIT 20;`
  );
}

export function getHashtag(hashtag) {
  return db.query(`SELECT * FROM hashtags WHERE name=$1;`, [hashtag]);
}

export function insertHashtag(hashtag) {
  return db.query(`INSERT INTO hashtags (name) VALUES ($1) RETURNING id;`, [
    hashtag,
  ]);
}

export function insertPostHashtag(postId, tagId) {
  return db.query(
    `INSERT INTO "postHashtag" ("postId", "hashtagId") VALUES ($1, $2);`,
    [postId, tagId]
  );
}

export function editPost(description, postId, userId) {
  return db.query(
    `UPDATE posts SET description = $1 WHERE id = $2 AND "userId"=$3`,
    [description, postId, userId]
  );
}

export function getPostById(postId) {
  return db.query(
    `SELECT p.id, p."userId", p.url, p.description, u.username, u."pictureUrl" 
  FROM posts p 
  JOIN users u on p."userId" = u.id 
  WHERE p.id = $1;`,
    [postId]
  );
}

export function deletePostById(userId, postId) {
  return db.query(`DELETE FROM posts WHERE "userId" = $1 AND id = $2`, [
    userId,
    postId,
  ]);
}

export function getPostHashtag(tagId, postId) {
  return db.query(
    `
  SELECT * FROM "postHashtag" WHERE "postId" = $1 AND "hashtagId" = $2`,
    [tagId, postId]
  );
}
