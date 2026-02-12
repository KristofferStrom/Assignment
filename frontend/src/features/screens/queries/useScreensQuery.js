import { useQuery } from "@tanstack/react-query";
import { getAllScreens } from "../api/screensApi";

export const useScreensQuery = () => {
  return useQuery({
    queryKey: ["screens"],
    queryFn: ({ signal }) => getAllScreens({ signal }),
    staleTime: 5 * 60_000,
  });
};
