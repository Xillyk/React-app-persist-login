import axios from "@/api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      // send cookie with request
      withCredentials: true,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setAuth((prev: any) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return {
        ...prev,
        accessToken: response.data.accessToken,
        roles: response.data.roles,
      };
    });
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
