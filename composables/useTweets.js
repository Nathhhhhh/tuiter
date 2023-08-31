export default () => {
  const postTweet = (formData) => {
    const form = new FormData();

    form.append("content", formData.content);

    formData.mediaFiles.forEach((file, index) => {
      form.append(`media_file_${index}`, file);
    });

    return useFetchApi("/api/user/tweets", {
      method: "POST",
      body: form,
    });
  };

  const getHomeTweets = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await useFetchApi("/api/tweets", {
          method: "GET",
        });

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getTweetById = (tweetId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await useFetchApi(`/api/tweets/${tweetId}`, {
          method: "GET",
        });

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    postTweet,
    getHomeTweets,
    getTweetById,
  };
};
