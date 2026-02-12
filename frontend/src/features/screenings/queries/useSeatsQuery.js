import { useQuery } from "@tanstack/react-query";
import { getSeatsByScreening } from "../api/screeningsApi";

export const useSeatsQuery = (screeningId) => {
  return useQuery({
    queryKey: ["seats", String(screeningId)],
    enabled: Boolean(screeningId),
    queryFn: async ({ signal }) => {
      const data = await getSeatsByScreening(screeningId, { signal });
      return data?.seats ?? [];
    },
  });
};
