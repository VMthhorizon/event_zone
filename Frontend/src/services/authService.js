import api from "./axiosConfig";

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Si è verificato un errore durante la registrazione.";
    throw new Error(message, { cause: error });
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Si è verificato un errore durante il login.";
    throw new Error(message, { cause: error });
  }
};
