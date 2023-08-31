import { createRefreshToken } from "../../db/refreshTokens";
import { getUserByUsername } from "../../db/users";
import { entityTransformer } from "../../transformers/entity";
import bcrypt from "bcrypt";
import { sendRefreshToken } from "../../utils/jwt";

export default defineEventHandler(async (e) => {
  const body = await readBody(e);

  const { username, password } = body;

  if (!username || !password) {
    return sendError(
      e,
      createError({
        statusCode: 400,
        statusMessage: "Invalid params",
      })
    );
  }

  const user = await getUserByUsername(username);

  const passwordMatches = await bcrypt.compare(password, user.password);

  if(!passwordMatches)
  {
    return sendError(
      e,
      createError({
        statusCode: 400,
        statusMessage: "Wrong password",
      })
    );
  }

  // Génération avec le package jwt
  const { accessToken, refreshToken } = generateToken(user);

  // Ajout dans la base de données
  await createRefreshToken({
    token: refreshToken,
    userId: user.id
  })

  // Ajout d'un cookie
  sendRefreshToken(e, refreshToken)

  return {
    access_token: accessToken,
    user: entityTransformer(user, ["password"]),
  };
});
