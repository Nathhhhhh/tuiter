import { dislikeTweet } from "../../../db/likes";
import { getUserLikes, likeTweet } from "../../../db/likes";
import formidable from "formidable";
export default defineEventHandler(async (e) => {
  const userId = e.context?.auth?.user?.id;
  const form = formidable({});
  const response = await new Promise((resolve, reject) => {
    form.parse(e.node.req, (error, fields) => {
      if (error) {
        reject(error);
      }
      resolve({ fields });
    });
  });

  const { fields } = response;
  const tweetId = Number(fields.tweetId);

  const listTweetsLikes = await getUserLikes(userId);

  const isTweetLiked = listTweetsLikes.find((like) => like.tweetId === tweetId);
  if (!isTweetLiked) {
    await likeTweet(tweetId, userId);
  } else {
    await dislikeTweet(tweetId, userId);
  }

  return {
    data: isTweetLiked ? true : false,
  };
});
