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

export async function getPostsByHashtag(hashtag) {
  const posts = await db.query(
    `SELECT
      p.id,
      p."userId",
      u.username,
      u."pictureUrl",
      p.url,
      p.description
    FROM
      posts p
    JOIN
      users u ON p."userId" = u.id
    JOIN
      "postHashtag" ph ON p.id = ph."postId"
    JOIN
      hashtags h ON ph."hashtagId" = h.id
    WHERE
      h.name = $1
    ORDER BY
     p.id DESC;`,
    [hashtag]
  );

  return posts.rows;
}
