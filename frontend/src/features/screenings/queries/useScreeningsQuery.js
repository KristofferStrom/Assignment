import { useQuery } from "@tanstack/react-query";
import { getScreeningsByMovie } from "../api/screeningsApi";

export const useScreeningsQuery = (movieId) => {
  return useQuery({
    queryKey: ["screenings", String(movieId)],
    enabled: Boolean(movieId),
    staleTime: 0,
    refetchOnMount: "always",
    queryFn: async ({ signal }) => {
      const data = await getScreeningsByMovie(movieId, { signal });
      return data?.screenings ?? [];
    },
  });
};
