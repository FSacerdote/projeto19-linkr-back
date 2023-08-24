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
      CASE WHEN p."referPost" IS NOT NULL THEN r."userId" ELSE p."userId" END AS "userId",
      CASE WHEN p."referPost" IS NOT NULL THEN u3.username ELSE u.username END AS username,
      CASE WHEN p."referPost" IS NOT NULL THEN u3."pictureUrl" ELSE u."pictureUrl" END AS "pictureUrl",
      CASE WHEN p."referPost" IS NOT NULL THEN r.url ELSE p.url END AS url,
      CASE WHEN p."referPost" IS NOT NULL THEN r.description ELSE p.description END AS description,
      p."referPost",
      CASE WHEN p."referPost" IS NOT NULL THEN (SELECT COUNT(*) FROM likes l WHERE l."postId" = p."referPost")
        ELSE (SELECT COUNT(*) FROM likes l WHERE l."postId" = p.id) END AS "likeCount",
      array_agg(json_build_object('userId', l."userId", 'username', u2.username)) AS "likedUsers",
      CASE WHEN p."referPost" IS NOT NULL THEN u.username ELSE NULL END AS "reposterUsername",
      CASE WHEN p."referPost" IS NOT NULL THEN (SELECT COUNT(*) FROM comments c WHERE c."postId" = p."referPost")
        ELSE (SELECT COUNT(*) FROM comments c WHERE c."postId" = p.id) END AS "commentCount"
    FROM 
      posts p 
    JOIN 
      users u ON p."userId" = u.id 
    LEFT JOIN 
      posts r ON p."referPost" = r.id
    LEFT JOIN 
      users u3 ON r."userId" = u3.id
    LEFT JOIN 
      "postHashtag" ph ON p.id = ph."postId" 
    LEFT JOIN 
      hashtags h ON ph."hashtagId" = h.id 
    LEFT JOIN likes l ON (
      (p."referPost" IS NOT NULL AND p."referPost" = l."postId")
      OR (p."referPost" IS NULL AND p.id = l."postId")
      )
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
      p.id, u.id, r.id, u3.id
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
