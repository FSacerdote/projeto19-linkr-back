import { db } from "../database/database.connection.js";

export function getUsersByUsername(username) {
  return db.query(
    `SELECT users.id, users.username, users."pictureUrl" FROM users WHERE username LIKE $1;`,
    [username + "%"]
  );
}

export function getPostsByUserId(id) {
  return db.query(
    `SELECT 
      p.id, 
      p."userId", 
      u.username, 
      u."pictureUrl", 
      p.url, 
      p.description,
      (SELECT COUNT(*) FROM likes l WHERE l."postId" = p.id) AS "likeCount",
      array_agg(json_build_object('userId', l."userId", 'username', u2.username)) AS "likedUsers"
    FROM 
      posts p 
    JOIN 
      users u ON p."userId" = u.id 
    LEFT JOIN 
      "postHashtag" ph ON p.id = ph."postId" 
    LEFT JOIN 
      hashtags h ON ph."hashtagId" = h.id 
    LEFT JOIN 
      likes l ON p.id = l."postId"
    LEFT JOIN 
      users u2 ON l."userId" = u2.id
    WHERE 
      u.id = $1 
    GROUP BY 
      p.id, u.id
    ORDER BY 
      p.id DESC;`,
    [id]
  );
}

export function getUserById(id) {
  return db.query(
    `SELECT users.id, users.username, users."pictureUrl" FROM users WHERE id = $1;`,
    [id]
  );
}
