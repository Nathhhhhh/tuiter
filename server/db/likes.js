import { now } from "moment";
import { prisma } from ".";

export const likeTweet = (tweetId = 0, userId = 0) => {
  return prisma.likes.create({
    data: {
      tweetId,
      userId,
    },
  });
};

export const dislikeTweet = (tweetId = 0, userId = 0) => {
  return prisma.likes.delete({
    where: {
      tweetId_userId: {
        tweetId,
        userId,
      },
    },
  });
};

export const getUserLikes = (userId = 0) => {
  return prisma.user
    .findUnique({
      where: {
        id: userId,
      },
    })
    .likes();
};

export const getTweetLikes = (tweetId = 0) => {
  return prisma.tweet.findUnique({
    where: {
      id: tweetId
    },
    include: {
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });
};
