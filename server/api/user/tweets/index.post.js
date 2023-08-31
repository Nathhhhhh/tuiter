import formidable from "formidable";
import { addReplyTo, createTweet } from "../../../db/tweet";
import { entityTransformer } from "../../../transformers/entity";
import { createMediaFile } from "../../../db/mediaFiles";
import {
  getPublicUrl,
  uploadToSupabase,
} from "../../../utils/supabaseMediaFile";
import fs from "fs";

export default defineEventHandler(async (e) => {
  const form = formidable({
    keepExtensions: true,
  });
  const response = await new Promise((resolve, reject) => {
    form.parse(e.node.req, (error, fields, files) => {
      if (error) {
        reject(error);
      }
      resolve({ fields, files });
    });
  });
  const { fields, files } = response;
  const userId = e.context?.auth?.user?.id;
  const tweetData = {
    content: fields.content[0],
    authorId: userId,
  };

  const replyTo = fields.replyTo;
  const tweet = await createTweet(tweetData);
  if (replyTo) {
    await addReplyTo(tweet.id, Number(replyTo));
  }

  if (files) {
    const filePromises = Object.keys(files).map(async (key) => {
      const file = files[key][0].toJSON();

      const fileData = await fs.readFileSync(file.filepath);

      const data = await uploadToSupabase(fileData, file.newFilename);

      const { publicUrl } = await getPublicUrl(data.path);

      return createMediaFile({
        url: publicUrl,
        userId: userId,
        tweetId: tweet.id,
      });
    });
    await Promise.all(filePromises);
  }

  return {
    data: entityTransformer(tweet, ["authorId", "replyToId"]),
    files,
  };
});
