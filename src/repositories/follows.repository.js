import { db } from "../database/database.connection.js";

export function searchUser(userId) {
  return db.query("SELECT * FROM users WHERE id=$1;", [userId]);
}

export function insertFollow(userId, followedId) {
  return db.query(
    `INSERT INTO followers ("userId", "followedId") VALUES ($1, $2);`,
    [userId, followedId]
  );
}

export function deleteFollow(userId, followedId) {
  return db.query(
    `DELETE FROM followers WHERE "userId"=$1 AND "followedId"=$2;`,
    [userId, followedId]
  );
}

export function getFollow(userId, followedId) {
  return db.query(
    `SELECT * FROM followers WHERE "userId"=$1 AND "followedId"=$2;`,
    [userId, followedId]
  );
}
