import {
  deleteFollow,
  insertFollow,
  searchUser,
} from "../repositories/follows.repository.js";

export async function follow(req, res) {
  const { userId } = res.locals;
  const { followedId } = req.body;
  try {
    const followed = await searchUser(followedId);
    if (followed.rowCount === 0)
      return res.status(404).send("Id da pessoa seguida é inválido");
    await insertFollow(userId, followedId);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function unfollow(req, res) {
  const { userId } = res.locals;
  const { followedId } = req.body;
  try {
    await deleteFollow(userId, followedId);
    res.send();
  } catch (error) {
    res.status(500).send(error.message);
  }
}
