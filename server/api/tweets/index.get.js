import { getTweets } from "../../db/tweet";
import { entityTransformer } from "../../transformers/entity";
import { tweetTransformer } from "../../transformers/tweet";

export default defineEventHandler(async (e) => {
  const tweets = await getTweets({
    include: {
      author: true,
      mediaFiles: true,
      replyTo: {
        include: {
          author: true,
          mediaFiles: true
        },
      },
      replies: {
        include: {
          author: true,
        },
      },
    },
    
    orderBy: {
      createdAt: "desc",
    },
  });
  return {
    tweets: tweets.map((tweet) => tweetTransformer(tweet)),
  };
});
