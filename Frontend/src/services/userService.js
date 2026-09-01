import api from "./axiosConfig";

export const getUserProfile = async () => {
  const response = await api.get("/user/me");

  return response.data;
};
