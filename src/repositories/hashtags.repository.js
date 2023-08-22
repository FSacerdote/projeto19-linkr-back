import { db } from "../database/database.connection.js";

export async function getHashtagsByFrequency(limit) {
  let query = `
    SELECT h.name, COUNT(*) AS frequency
    FROM hashtags h
    JOIN "postHashtag" ph ON h.id = ph."hashtagId"
    GROUP BY h.name
    ORDER BY frequency DESC
  `;

  let params = [];

  if (limit) {
    query += ` LIMIT $${params.length + 1}`;
    params.push(parseInt(limit));
  }

  const trending = await db.query(query, params);
  return trending.rows;
}

export async function getPostsByHashtag(hashtag, offset, limit) {
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
    JOIN 
      "postHashtag" ph ON p.id = ph."postId" 
    JOIN 
      hashtags h ON ph."hashtagId" = h.id 
    LEFT JOIN 
      likes l ON p.id = l."postId"
    LEFT JOIN 
      users u2 ON l."userId" = u2.id
    WHERE 
      h.name = $1 
    GROUP BY 
      p.id, u.id
    ORDER BY 
      p.id DESC
  `;

  let params = [];
  params.push(hashtag);

  if (offset) {
    query += ` OFFSET $${queryParams.length + 1}`;
    queryParams.push(offset);
  }

  if (limit) {
    query += ` LIMIT $${params.length + 1}`;
    params.push(limit);
  }

  const posts = await db.query(query, params);
  return posts.rows;
}
