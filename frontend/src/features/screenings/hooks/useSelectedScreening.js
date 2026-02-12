import { useParams } from "react-router-dom";
import { useScreeningsQuery } from "../queries/useScreeningsQuery";
import { useMemo } from "react";

export const useSelectedScreening = () => {
  const { movieId, screeningId } = useParams();
  const {
    data: screenings = [],
    isLoading,
    isError,
    error,
  } = useScreeningsQuery(movieId);

  const selectedScreening = useMemo(() => {
    return (
      screenings.find(
        (screening) => String(screening.id) === String(screeningId)
      ) || null
    );
  }, [screenings, screeningId]);

  return {
    selectedScreening,
    isLoading,
    isError,
    error,
  };
};
