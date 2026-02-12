import { api } from "../../../shared/lib/apiClient";
import { BOOKING_API_ENDPOINTS } from "../../booking/api/endpoints";

export const getScreeningsByMovie = async (id, { signal }) => {
  return await api.get(BOOKING_API_ENDPOINTS.MOVIE_SCREENINGS(id), { signal });
};

export const getSeatsByScreening = async (screeningId, { signal } = {}) => {
  const data = await api.get(`/screenings/${screeningId}`, { signal });

  return data;
};

export const deleteScreening = async (screeningId) => {
  await api.delete(`/screenings/${screeningId}`);
};

export const createScreening = async ({
  movieId,
  screenId,
  startsAt,
  language,
  subtitles,
}) => {
  const data = await api.post(`/screenings`, {
    movieId,
    screenId,
    startsAt,
    language,
    subtitles,
  });
  return data;
};
