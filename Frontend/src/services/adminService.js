import api from "./axiosConfig";

export const getUsersList = async () => {
  try {
    const response = await api.get("/admin/users");

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "Si è verificato un errore durante il recupero della lista dei profili";
    throw new Error(message);
  }
};

export const changeUserRole = async (userId, newRole) => {
  try {
    const response = await api.patch(`/admin/${userId}/role`, {
      role: newRole,
    });

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "Si è verificato un errore durante il cambio del ruolo dello user";
    throw new Error(message);
  }
};
