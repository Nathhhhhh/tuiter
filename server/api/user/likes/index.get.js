import { getUserLikes } from "../../../db/likes";

export default defineEventHandler((e) => {
  const userId = e.context?.auth?.user?.id;
  return getUserLikes(userId);
});
