import BookingSummary from "./bookingSummary/BookingSummary";
import styles from "./MovieSeatPickerPage.module.css";
import SeatPicker from "./seatPicker/SeatPicker";
import ShowCase from "./showCase/ShowCase";
import { useNavigate } from "react-router-dom";
import SecondaryButton from "../../../../shared/ui/buttons/secondaryButton/SecondaryButton";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../../../shared/ui/spinner/Spinner";
import { useBookingsContext } from "../../context/BookingsContext";
import { useSelectedMovie } from "../../../movies/hooks/useSelectedMovie";
import { useSelectedScreening } from "../../../screenings/hooks/useSelectedScreening";
const MovieSeatPickerPage = () => {
  const { selectedSeatNumbersByScreening, clearOtherSelectedSeats } =
    useBookingsContext();
  const { isLoading: screeningsLoading } = useSelectedScreening();
  const { selectedMovie, isLoading: moviesLoading } = useSelectedMovie();
  const { movieId, screeningId } = useParams();
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate(`/booking/movies/${movieId}/screenings/${screeningId}/checkout`);
  };

  useEffect(() => {
    clearOtherSelectedSeats(screeningId);
  }, [screeningId, clearOtherSelectedSeats]);

  return (
    <div className={styles.movieSeatPickerPage}>
      {moviesLoading || screeningsLoading ? (
        <Spinner size="lg" />
      ) : (
        <>
          <h2 className={styles.title}>
            {selectedMovie ? (
              <>
                Välj platser för{" "}
                <span className={styles.movieTitle}>{selectedMovie.title}</span>
                .
              </>
            ) : (
              "Ingen film vald"
            )}
          </h2>
          <ShowCase />
          <SeatPicker />
          <BookingSummary />
          <SecondaryButton
            disabled={
              (selectedSeatNumbersByScreening[String(screeningId)]?.length ??
                0) === 0
            }
            onClick={handleBookingClick}
            className={styles.bookBtn}
          >
            Boka platser
          </SecondaryButton>
        </>
      )}
    </div>
  );
};

export default MovieSeatPickerPage;
