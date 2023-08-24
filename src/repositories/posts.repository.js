import { db } from "../database/database.connection.js";

export function insertPost(userId, url, description) {
  return db.query(
    `INSERT INTO posts ("userId", url, description) VALUES ($1, $2, $3) RETURNING id;`,
    [userId, url, description]
  );
}

export async function getPostsQuery(offset, limit, untilId, userId) {
  let query = `
    SELECT 
      p.id, 
      CASE WHEN p."referPost" IS NOT NULL THEN r."userId" ELSE p."userId" END AS "userId",
      CASE WHEN p."referPost" IS NOT NULL THEN r.url ELSE p.url END AS url,
      CASE WHEN p."referPost" IS NOT NULL THEN r.description ELSE p.description END AS description,
      CASE WHEN p."referPost" IS NOT NULL THEN u2.username ELSE u.username END AS username,
      CASE WHEN p."referPost" IS NOT NULL THEN u2."pictureUrl" ELSE u."pictureUrl" END AS "pictureUrl",
      p."referPost",
      CASE WHEN p."referPost" IS NOT NULL THEN (SELECT COUNT(*) FROM likes l WHERE l."postId" = p."referPost")
        ELSE (SELECT COUNT(*) FROM likes l WHERE l."postId" = p.id) END AS "likeCount",
      array_agg(json_build_object('userId', l."userId", 'username', u2.username)) AS "likedUsers",
      CASE WHEN p."referPost" IS NOT NULL THEN u.username ELSE NULL END AS "reposterUsername",
      (SELECT COUNT(*) FROM posts rp WHERE rp."referPost" = p."referPost") AS "repostCount",
      CASE WHEN p."referPost" IS NOT NULL THEN (SELECT COUNT(*) FROM comments c WHERE c."postId" = p."referPost")
        ELSE (SELECT COUNT(*) FROM comments c WHERE c."postId" = p.id) END AS "commentCount"
    FROM posts p
    LEFT JOIN followers f ON p."userId" = f."followedId"
    JOIN users u ON p."userId" = u.id
    LEFT JOIN likes l ON (
      (p."referPost" IS NOT NULL AND p."referPost" = l."postId")
      OR (p."referPost" IS NULL AND p.id = l."postId")
      )
    LEFT JOIN users u2 ON l."userId" = u2.id
    LEFT JOIN posts r ON p."referPost" = r.id
    LEFT JOIN users u3 ON r."userId" = u3.id
    LEFT JOIN comments c ON p.id = c."postId"
    WHERE (f."userId" = $1 OR p."userId" = $1)
  `;

  let params = [userId];

  if (untilId) {
    query += ` AND p.id > $${params.length + 1}`;
    params.push(untilId);
  }

  query += `
    GROUP BY p.id, u.id, r.id, u2.id, u3.id
    ORDER BY p.id DESC
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

export function searchFollowers(userId) {
  return db.query(`SELECT * FROM followers WHERE "userId"=$1;`, [userId]);
}

export function insertRepost(userId, url, description, postId) {
  return db.query(
    `INSERT INTO posts ("userId", url, description, "referPost") VALUES ($1, $2, $3, $4)`,
    [userId, url, description, postId]
  );
}
