import { getRefreshTokenByToken } from "../../db/refreshTokens";
import { decodeRefreshToken } from "../../utils/jwt";
import { getUserById } from "../../db/users";
export default defineEventHandler(async (e) => {
  const cookies = parseCookies(e);

  const refreshToken = cookies.refresh_token;

  if (!refreshToken) {
    return sendError(
      e,
      createError({
        statusCode: 401,
        statusMessage: "Invalid refresh token",
      })
    );
  }

  const dbRefreshToken = await getRefreshTokenByToken(refreshToken);

  if (!dbRefreshToken) {
    return sendError(
      e,
      createError({
        statusCode: 401,
        statusMessage: "Invalid refresh token",
      })
    );
  }

  const token = decodeRefreshToken(refreshToken);

  try {
    const user = await getUserById(token.userId);

    const { accessToken } = generateToken(user);

    return {access_token: accessToken};

  } catch (error) {
    return sendError(
        e,
        createError({
          statusCode: 500,
          statusMessage: "Something went wrong",
        })
      );
  }
});
