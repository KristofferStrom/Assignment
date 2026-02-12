import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api/moviesApi";
import { Movie } from "../types/movie";

export const useMoviesQuery = () => {
  return useQuery({
    queryKey: ["movies"],
    staleTime: 5 * 60_000,
    queryFn: ({ signal }) => getMovies({ signal }),
    select: (moviesDto) => moviesDto.map(Movie.fromDto),
  });
};
