import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteMovie } from "../api/moviesApi";

export const useDeleteMovieMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (movieId) => deleteMovie(movieId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["movies"] }),
  });
};
