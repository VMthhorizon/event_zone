import api from "./axiosConfig";

export const fetchTickets = async (orderId) => {
  try {
    const response = await api.get(`order/${orderId}/tickets`);

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Non è stato possibile caricare i biglietti acquistati";

    throw new Error(message, { cause: error });
  }
};
