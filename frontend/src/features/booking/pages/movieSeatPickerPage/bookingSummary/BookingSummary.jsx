import styles from "./BookingSummary.module.css";
import { useBookingsContext } from "../../../context/BookingsContext";
import { useSelectedMovie } from "../../../../movies/hooks/useSelectedMovie";
import { useSelectedScreening } from "../../../../screenings/hooks/useSelectedScreening";

const BookingSummary = () => {
  const { selectedSeatNumbersByScreening } = useBookingsContext();
  const { selectedMovie } = useSelectedMovie();
  const { selectedScreening } = useSelectedScreening();

  const key = String(selectedScreening?.id);

  const amountOfSeats = selectedSeatNumbersByScreening[key]?.length || 0;
  const totalPrice = amountOfSeats * (selectedMovie?.price || 0);
  return (
    <p className={styles.text}>
      Du har valt <span>{amountOfSeats}</span> platser för kostnaden{" "}
      <span>{totalPrice}</span> kr
    </p>
  );
};
export default BookingSummary;
