import api from "./axiosConfig";

export const uploadImage = async (img) => {
  const formData = new FormData();
  formData.append("img", img);

  try {
    const response = await api.post("/event/img", formData);

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Errore durante il caricamento dell'immagine";

    throw new Error(message, { cause: error });
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await api.post("/event", eventData);

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Errore durante la creazione dell'evento";

    throw new Error(message, { cause: error });
  }
};

export const getAllEvents = async () => {
  try {
    const response = await api.get("/event");

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Errore durante il caricamento degli eventi";

    throw new Error(message, { cause: error });
  }
};

export const getEventById = async (eventId) => {
  try {
    const response = await api.get(`/event/${eventId}`);

    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Evento non trovato";
    throw new Error(message, { cause: error });
  }
};
