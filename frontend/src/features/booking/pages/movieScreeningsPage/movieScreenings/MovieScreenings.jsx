import styles from "./MovieScreenings.module.css";
import ScreeningListItem from "./screeningListItem/ScreeningListItem";
import { useScreeningsQuery } from "../../../../screenings/queries/useScreeningsQuery";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../../shared/ui/spinner/Spinner";
const MovieScreenings = ({ movieId }) => {
  const {
    data: screenings = [],
    error,
    isLoading,
    isError,
  } = useScreeningsQuery(movieId);
  const navigate = useNavigate();

  const handleSelectScreening = (screeningId) => {
    navigate(`/booking/movies/${movieId}/screenings/${screeningId}/seats`);
  };
  return (
    <>
      {!movieId ? null : isLoading ? (
        <Spinner size="lg" />
      ) : isError ? (
        <p>Error loading screenings: {error.message}</p>
      ) : screenings.length === 0 ? (
        <p>No screenings available for the selected movie.</p>
      ) : (
        <ul className={styles.list} aria-label="Visningar">
          {screenings.map((s) => (
            <ScreeningListItem
              key={s.id}
              screening={s}
              onSelect={handleSelectScreening}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieScreenings;
