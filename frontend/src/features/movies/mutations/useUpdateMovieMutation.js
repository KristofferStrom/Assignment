import { useMutation } from "@tanstack/react-query";
import { updateMovie } from "../api/moviesApi";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdateMovieMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => updateMovie(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["movies"] }),
  });
};
