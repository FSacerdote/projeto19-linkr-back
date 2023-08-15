import {
  getHashtagsByAmount
} from "../repositories/hashtags.repository.js";

export async function getTrending(req, res) {
    const { limit } = req.query;

    try {
        const trending = await getHashtagsByAmount(limit);
        res.send(trending);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
