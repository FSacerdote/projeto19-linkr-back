import { db } from "../database/database.connection.js";

export function getUsersByUsername(username, userId) {
  return db.query(
    `SELECT users.id, users.username, users."pictureUrl", followers."userId" AS "isFollowed" FROM users
    LEFT JOIN followers ON users.id=followers."followedId" AND followers."userId"=$2
    WHERE username LIKE $1 ORDER BY followers."userId";`,
    [username + "%", userId]
  );
}

export async function getPostsByUserId(id, offset, limit, untilId) {
  let query = `
    SELECT 
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
  `;

  let params = [id];

  if (untilId) {
    query += ` AND p.id > $${params.length + 1}`;
    params.push(untilId);
  }

  query += `
    GROUP BY 
      p.id, u.id
    ORDER BY 
      p.id DESC
  `;

  if (offset) {
    query += ` OFFSET $${params.length + 1}`;
    params.push(offset);
  }

  if (limit) {
    query += ` LIMIT $${params.length + 1}`;
    params.push(limit);
  }

  const posts = await db.query(query, params);
  return posts;
}

export function getUserById(id) {
  return db.query(
    `SELECT users.id, users.username, users."pictureUrl" FROM users WHERE id = $1;`,
    [id]
  );
}
