import { api } from "../../../shared/lib/apiClient";
import { MOVIES_ENDPOINTS } from "./endpoints";

export const getMovies = async ({ signal } = {}) => {
  const data = await api.get(MOVIES_ENDPOINTS.MOVIES, { signal });

  return data?.movies ?? [];
};

export const createMovie = async ({ title, price, signal } = {}) => {
  const data = await api.post(
    MOVIES_ENDPOINTS.MOVIES,
    { title, price },
    { signal }
  );

  return data;
};

export const deleteMovie = async (movieId) => {
  await api.delete(`${MOVIES_ENDPOINTS.MOVIES}/${movieId}`);
};

export const updateMovie = async ({ id, title, price } = {}) => {
  const data = await api.put(`${MOVIES_ENDPOINTS.MOVIES}/${id}`, {
    title,
    price,
  });
  return data;
};
