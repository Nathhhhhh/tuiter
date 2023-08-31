import { getTweetLikes } from "../../../db/likes";

export default defineEventHandler(async (e) => {
  const tweetId = Number(getQuery(e).tweetId);
  const likes = await getTweetLikes(tweetId);

  return likes._count.likes;
});
