import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMovie } from "../api/moviesApi";

export const useCreateMovieMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMovie,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
};
