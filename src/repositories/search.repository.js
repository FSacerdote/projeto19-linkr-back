import { db } from "../database/database.connection.js";

export function getUsersByUsername(username) {
  return db.query(
    `SELECT users.id, users.username, users."pictureUrl" FROM users WHERE LOWER(username) LIKE LOWER($1);`,
    [username + "%"]
  );
}

export function getPostsByUserId(id) {
  return db.query(
    `SELECT p.id, p."userId", p.url, p.description, u.username, u."pictureUrl" 
    FROM posts p JOIN users u ON u.id = p."userId" WHERE u.id = $1
    ORDER BY p.id DESC`,
    [id]
  );
}

export function getUserById(id) {
  return db.query(
    `SELECT users.id, users.username, users."pictureUrl" FROM users WHERE id = $1;`,
    [id]
  );
}
