import { db } from "../database/database.connection.js";

export function getUsersByUsername(username) {
  return db.query(
    `SELECT users.id, users.username, users."pictureUrl" FROM users WHERE username LIKE $1;`,
    [username + "%"]
  );
}

export function getPostsByUserId(id) {
  return db.query(`SELECT * FROM posts WHERE "userId" = $1;`, [id]);
}

export function getUserById(id) {
  return db.query(
    `SELECT users.id, users.username, users."pictureUrl" FROM users WHERE id = $1;`,
    [id]
  );
}
