import { db } from "../database/database.connection.js";

export function getUserByEmailDb(email) {
  return db.query(`SELECT * FROM users WHERE email=$1;`, [email]);
}

export function getUsersByUsername(username) {
  return db.query(`SELECT users.id, users.username, users."pictureUrl" FROM users WHERE username LIKE $1;`, [username + '%']);
}

export function createUserDb(username, email, hash, pictureUrl) {
  return db.query(
    `
            INSERT INTO users (username, email, password, "pictureUrl")
            VALUES ($1, $2, $3, $4);
    `,
    [username, email, hash, pictureUrl]
  );
}
