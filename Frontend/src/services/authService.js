import api from "./axiosConfig";

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);

    return response.data;
  } catch {
    const errorMessage = "ERRORE nella registrazione";
    throw new Error(errorMessage);
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);

    return response.data;
  } catch {
    const errorMessage = "ERRORE nel login";
    alert(errorMessage);
    throw new Error(errorMessage);
  }
};
