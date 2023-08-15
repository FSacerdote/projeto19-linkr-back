import { db } from "../database/database.connection.js";

export async function getHashtagsByAmount(limit) {
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
