import jwt_decode from "jwt-decode";

export default () => {
  const useAuthToken = () => useState("auth_token");
  const useAuthUser = () => useState("auth_user");
  const useAuthLoading = () => useState("auth_loading", () => true);
  const setToken = (newToken) => {
    useAuthToken().value = newToken;
  };

  const setUser = (newUser) => {
    useAuthUser().value = newUser;
  };

  const setIsAuthLoading = (value = true) => {
    useAuthLoading().value = value;
  };

  const reRefreshingAccessToken = () => {
    const token = jwt_decode(useAuthToken().value);
    if (!token) {
      return;
    }
    const refreshingTime = token.exp - 60000;

    setTimeout(async () => {
      await refreshingToken();
      reRefreshingAccessToken();
    }, refreshingTime);
  };

  const login = ({ username, password }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/login", {
          method: "POST",
          body: {
            username,
            password,
          },
        });
        setToken(data.access_token);

        setUser(data.user);

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const refreshingToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/refresh");
        setToken(data.access_token);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await useFetchApi("/api/auth/user");
        setUser(data.user);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };
  const initAuth = () => {
    setIsAuthLoading();
    return new Promise(async (resolve, reject) => {
      try {
        await refreshingToken();
        await getUser();
        reRefreshingAccessToken();
        resolve(true);
      } catch (error) {
        reject(error);
      } finally {
        setIsAuthLoading(false);
      }
    });
  };

  return {
    login,
    useAuthUser,
    initAuth,
    useAuthToken,
    useAuthLoading,
  };
};
