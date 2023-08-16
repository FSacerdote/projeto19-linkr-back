import { db } from "../database/database.connection.js";

export function insertPost(userId, url, description) {
  return db.query(
    `INSERT INTO posts ("userId", url, description) VALUES ($1, $2, $3);`,
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
