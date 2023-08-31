import { prisma } from ".";

export const createTweet = (tweetData) => {
  return prisma.tweet.create({
    data: tweetData,
  });
};

export const getTweets = (params = {}) => {
  return prisma.tweet.findMany({
    ...params,
  });
};

export const getTweet = (id = 0) => {
  return prisma.tweet.findUnique({
    where: {
      id: id,
    },
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
  });
};

export const addReplyTo = async (tweetIdA = 0, tweetIdB = 0) => {
  return prisma.tweet.update({
    where: {
      id: tweetIdA,
    },
    data: {
      replyTo: {
        connect: [
          {
            id: tweetIdB,
          },
        ],
      },
    },
  });
};
