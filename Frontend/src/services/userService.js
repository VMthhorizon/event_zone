import api from "./axiosConfig";

export const getUserProfile = async () => {
  try {
    const response = await api.get("/user/me");

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "Si è verificato un errore durante il recupero del profilo.";
    throw new Error(message);
  }
};
