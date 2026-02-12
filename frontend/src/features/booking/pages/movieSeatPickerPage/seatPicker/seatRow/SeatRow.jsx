import styles from "./SeatRow.module.css";
import { Seat } from "../../../../../../shared/ui";
import { useBookingsContext } from "../../../../context/BookingsContext";
const SeatRow = ({ seats, screeningId }) => {
  const { toggleSeat } = useBookingsContext();
  return (
    <div className={styles.row}>
      {seats.map((seat) => (
        <Seat
          key={seat.seatNumber}
          className={styles.seat}
          seatNumber={seat.seatNumber}
          isOccupied={seat.isOccupied}
          isSelected={seat.isSelected}
          onSelected={(seatNumber) => toggleSeat(screeningId, seatNumber)}
        />
      ))}
    </div>
  );
};

export default SeatRow;
