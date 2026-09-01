import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor per iniettare automaticamente il token JWT nell'header authorization nelle richieste

api.interceptors.request.use(
  (config) => {
    // Lista degli endpoint PUBBLICI da ignorare per non inviare il token quando non necessario
    const publicEndpoints = ["/auth/login", "/auth/register"];

    // Controllo se almeno uno degli endpoint è incluso nella richiesta corrente
    const isPublic = publicEndpoints.some((url) => config.url.includes(url));

    // Se gli endpoints non sono pubblici, allora verrà inviato anche il token
    if (!isPublic) {
      const token = localStorage.getItem("token"); // Prelevo il token dal localstorage

      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Inietto il token nell'header
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
