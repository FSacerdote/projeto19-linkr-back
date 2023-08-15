export async function likePost(req, res) {
  try {
    res.status(201).send("Post liked");
  } catch (err) {
    res.status(500).send("An error occurred while liking the post");
  }
}

export async function dislikePost(req, res) {
  try {
    res.status(200).send("Post disliked");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while disliking the post");
  }
}

export async function getLikes(req, res) {
  const { postId } = req.params;
  try {
    res.status(200).send("Enviar número de likes");
  } catch (err) {
    res.status(500).send(err.message);
  }
}
