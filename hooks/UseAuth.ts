import { UserDto } from "@/dto/user.dto";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const UseAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<UserDto>();
  async function checkAuth(): Promise<void> {
    const accessToken: string | undefined = (
      await cookieStore.get("accessToken")
    )?.value;
    const refreshToken: string | undefined = (
      await cookieStore.get("refreshToken")
    )?.value;
    if (!accessToken || !refreshToken) return setIsAuth(false);
    const accessTokenData = jwtDecode(accessToken);
    const refreshTokenData = jwtDecode(refreshToken);
    if (accessTokenData.exp! < Date.now() / 1000) {
      if (refreshTokenData.exp! < Date.now() / 1000) {
        return setIsAuth(false);
      }
      const newAccessToken = (
        await axios.post("http://localhost:3100/api/auth/refresh", {
          refreshToken,
        })
      ).data;
      await cookieStore.set("accessToken", newAccessToken);
      const user: UserDto = (
        await axios.get(
          `http://localhost:3100/api/users/${accessTokenData.sub}`,
        )
      ).data;
      setUser(user);
      setIsAuth(true);
    } else {
      const user: UserDto = (
        await axios.get(
          `http://localhost:3100/api/users/${accessTokenData.sub}`,
        )
      ).data;
      setUser(user);
      setIsAuth(true);
    }
  }
  useEffect(() => {
    checkAuth();
  }, []);
  return { isAuth, user };
};

export default UseAuth;
