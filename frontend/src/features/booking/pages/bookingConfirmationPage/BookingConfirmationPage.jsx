import { Link, Navigate, useParams } from "react-router-dom";
import styles from "./BookingConfirmationPage.module.css";
import { loadReceipt, clearReceipt } from "../../storage/receiptStorage";
import { formatSvDateTime } from "../../../../shared/formatters/dateTime";
import Highlight from "../../../../shared/ui/highlight/Highlight";
import DefinitionList from "../../../../shared/ui/definition/definitionList/DefinitionList";
import DefinitionRow from "../../../../shared/ui/definition/definitionRow/DefinitionRow";
import { useEffect } from "react";
import { useBookingsContext } from "../../context/BookingsContext";
const BookingConfirmationPage = () => {
  const { clearSelectedSeats } = useBookingsContext();
  const { bookingId, screeningId, movieId } = useParams();
  const receipt = loadReceipt(bookingId);

  if (!movieId || !screeningId || !bookingId || !receipt) {
    return <Navigate to="/booking" replace />;
  }

  const seats = Array.isArray(receipt.seatNumbers) ? receipt.seatNumbers : [];

  useEffect(() => {
    if (screeningId) clearSelectedSeats(screeningId);
  }, [screeningId, clearSelectedSeats]);

  const handleLeaveConfirmation = () => {
    clearReceipt(bookingId);
  };

  return (
    <div className={styles.bookingConfirmationPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>Bokning bekräftad</h1>
        <p className={styles.subtitle}>
          Tack {receipt.name}! Din bokning är registrerad.
        </p>
      </header>

      <div className={styles.grid}>
        <Highlight className={styles.card}>
          <h2 className={styles.cardTitle}>Din visning</h2>

          <DefinitionList>
            <DefinitionRow term="Film">{receipt.movieTitle}</DefinitionRow>
            <DefinitionRow term="Salong">{receipt.screenName}</DefinitionRow>
            <DefinitionRow term="Tid">
              {formatSvDateTime(receipt.startsAt)}
            </DefinitionRow>
            <DefinitionRow term="Språk">
              {receipt.language}
              {receipt.subtitles ? ` • Text: ${receipt.subtitles}` : ""}
            </DefinitionRow>

            <DefinitionRow term="Platser">
              {seats.length ? (
                seats.map((n) => (
                  <span key={n} className={styles.seatChip}>
                    {n}
                  </span>
                ))
              ) : (
                <span>-</span>
              )}
            </DefinitionRow>
          </DefinitionList>

          <Link
            className={styles.link}
            onClick={handleLeaveConfirmation}
            to={`/booking/movies/${movieId}/screenings/${screeningId}/seats`}
          >
            Se visningen igen
          </Link>
        </Highlight>

        <Highlight className={styles.card}>
          <h2 className={styles.cardTitle}>Betalning</h2>

          <DefinitionList>
            <DefinitionRow term="Pris/st">
              {receipt.pricePerSeat} kr
            </DefinitionRow>
            <DefinitionRow term="Antal">{seats.length} st</DefinitionRow>
            <DefinitionRow term="Totalt">{receipt.totalPrice} kr</DefinitionRow>
            <DefinitionRow term="Boknings-ID">
              {receipt.bookingId}
            </DefinitionRow>
            <DefinitionRow term="Skapad av">{receipt.name}</DefinitionRow>
            <DefinitionRow term="Kontakt">
              {receipt.phoneMasked ?? "-"}
            </DefinitionRow>
          </DefinitionList>

          <Link
            onClick={handleLeaveConfirmation}
            to="/booking"
            className={styles.link}
          >
            Till startsidan
          </Link>
        </Highlight>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
