import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteScreening } from "../api/screeningsApi";

export const useDeleteScreeningMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (screeningId) => deleteScreening(screeningId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["screenings"] }),
  });
};
