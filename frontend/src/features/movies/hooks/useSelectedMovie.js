import { useParams } from "react-router-dom";
import { useMoviesQuery } from "../queries/useMoviesQuery";
import { useMemo } from "react";

export const useSelectedMovie = () => {
  const { movieId } = useParams();
  const { data: movies = [], isLoading, isError, error } = useMoviesQuery();

  const selectedMovie = useMemo(() => {
    return movies.find((movie) => String(movie.id) === String(movieId)) || null;
  }, [movies, movieId]);

  return {
    selectedMovie,
    isLoading,
    isError,
    error,
  };
};
