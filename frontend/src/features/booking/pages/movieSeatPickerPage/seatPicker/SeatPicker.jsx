import styles from "./SeatPicker.module.css";
import SeatRow from "./seatRow/SeatRow";
import Screen from "./screen/Screen";
import { useSeatsQuery } from "../../../../screenings/queries/useSeatsQuery";
import { useParams } from "react-router-dom";
import Spinner from "../../../../../shared/ui/spinner/Spinner";
import { useBookingsContext } from "../../../context/BookingsContext";
const SeatPicker = () => {
  const { screeningId } = useParams();
  const { selectedSeatNumbersByScreening } = useBookingsContext();

  const {
    data: seatsFromApi = [],
    isLoading,
    isError,
    error,
  } = useSeatsQuery(screeningId);

  const selectedNumbers =
    selectedSeatNumbersByScreening[String(screeningId)] || [];

  const seats = seatsFromApi.map((seat) => ({
    ...seat,
    isSelected: selectedNumbers.includes(seat.seatNumber),
  }));

  const amountOfSeatsPerRow = 8;
  const rows = Math.floor(seats.length / amountOfSeatsPerRow);
  let startIndex = 0;
  let endIndex = amountOfSeatsPerRow;

  let seatRows = [];
  for (let index = 0; index < rows; index++) {
    seatRows.push(
      <SeatRow
        key={index}
        rowIndex={index}
        seats={seats.slice(startIndex, endIndex)}
        screeningId={screeningId}
      />
    );
    startIndex += amountOfSeatsPerRow;
    endIndex += amountOfSeatsPerRow;
  }

  return (
    <div className={styles.container}>
      <Screen />
      {isLoading ? (
        <Spinner size="lg" />
      ) : isError ? (
        <p>Error loading seats: {error.message}</p>
      ) : seats.length === 0 ? (
        <p>No seats available for this screening.</p>
      ) : (
        seatRows
      )}
    </div>
  );
};
export default SeatPicker;
