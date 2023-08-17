import { db } from "../database/database.connection.js";

export function insertPost(userId, url, description) {
  return db.query(
    `INSERT INTO posts ("userId", url, description) VALUES ($1, $2, $3) RETURNING id;`,
    [userId, url, description]
  );
}

export function getPostsQuery() {
  return db.query(
    `SELECT p.id, p."userId", p.url, p.description, u.username, u."pictureUrl" 
    FROM posts p 
    JOIN users u on p."userId" = u.id 
    ORDER BY p.id LIMIT 20;`
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

export function editPostHashtag(postId, tagId) {
  return db.query(
    `UPDATE "postHashtag" SET "postId", "hashtagId") VALUES ($1, $2);`,
    [postId, tagId]
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
