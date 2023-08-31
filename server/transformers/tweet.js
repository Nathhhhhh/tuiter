import { entityTransformer } from "./entity";
import human from "human-time";

export const tweetTransformer = (tweet) => {
  return {
    id: tweet.id ?? null,
    content: tweet.content ?? null,
    createdAt: tweet.createdAt ?? null,
    replies: tweet.replies ? tweet.replies.map(tweetTransformer) : [],
    replyTo: tweet.replyTo ? tweet.replyTo.map(tweetTransformer) : [],
    mediaFiles: tweet.mediaFiles
      ? tweet.mediaFiles.map((mediaFile) =>
          entityTransformer(mediaFile, ["userId", "id"])
        )
      : [],
    author: tweet.author
      ? entityTransformer(tweet.author, ["password", "email", "id"], {handle: '@' + tweet.author.username})
      : null,
    repliesCount: tweet.replies ? tweet.replies.length : 0,
    postedAtHuman: human(tweet.createdAt),
  };
};
