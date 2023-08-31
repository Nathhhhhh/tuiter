import { getTweet } from "../../db/tweet";
import { tweetTransformer } from "../../transformers/tweet";

export default defineEventHandler(async (e) => {
  const { id } = e.context.params;

  const tweet = await getTweet(Number(id));


  return {
    "tweet": tweetTransformer(tweet),
  };
});
