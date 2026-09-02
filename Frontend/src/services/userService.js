import api from "./axiosConfig";

export const getUserProfile = async () => {
  const response = await api.get("/user/me");

  return response.data;
};

export const changeUserPass = async (oldPassword, newPassword) => {
  try {
    const response = await api.patch("/user/me/change-password", {
      oldPass: oldPassword,
      newPass: newPassword,
    });

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Impossibile aggiornare la password";

    throw new Error(message);
  }
};

export const deleteAccount = async () => {
  try {
    await api.delete("/user/me");
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Non è stato possibile cancellare l'account";

    throw new Error(message);
  }
};
