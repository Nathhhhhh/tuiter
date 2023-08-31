import { createUser } from "../../db/users";
import {entityTransformer} from '../../transformers/entity'
export default defineEventHandler(async (e) => {
  const body = await readBody(e);

  const { email, password, username, name } = body;

  if (!email || !password || !username || !name) {
    return sendError(
      e,
      createError({ statusCode: 400, statusMessage: "Invalid params" })
    );
  }

  const userData = {
    username,
    email,
    password,
    name,
    profileImage: 'https://picsum.photos/200/200'
  };

  const user = await createUser(userData);

  return { body: entityTransformer(user, ['password']) };
});
