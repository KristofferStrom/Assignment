export const BOOKING_API_ENDPOINTS = {
  MOVIES: "/movies",
  MOVIE_SCREENINGS: (movieId) => `/screenings/bymovie/${movieId}`,
  BOOKINGS: "/bookings",
};
