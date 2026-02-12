import styles from "./BookingStepper.module.css";
import { useLocation, useParams } from "react-router-dom";
import StepItem from "../../../shared/ui/stepItem/StepItem";
import { useBookingsContext } from "../context/BookingsContext";
import { useSelectedMovie } from "../../movies/hooks/useSelectedMovie";
import { useSelectedScreening } from "../../screenings/hooks/useSelectedScreening";

const BookingStepper = () => {
  const location = useLocation();
  const { selectedMovie } = useSelectedMovie();
  const { selectedScreening } = useSelectedScreening();
  const { selectedSeatNumbersByScreening } = useBookingsContext();
  const { bookingId, movieId, screeningId } = useParams();

  const path = location.pathname;

  const isOnSeatPickerPage = path.includes("/seats");
  const isOnCheckoutPage = path.includes("/checkout");
  const isOnConfirmationPage = path.includes("/confirmation");

  const hasMovie = Boolean(selectedMovie);
  const hasScreening = Boolean(selectedScreening);

  const selectedNumbers =
    selectedSeatNumbersByScreening[String(selectedScreening?.id)] || [];
  const hasSelectedSeats = selectedNumbers.length > 0;

  const canGoSeats = hasMovie && hasScreening && !bookingId;
  const canGoCheckout = canGoSeats && hasSelectedSeats && !bookingId;

  const canGoConfirmation = isOnConfirmationPage;

  const seatsPath = canGoSeats
    ? `/booking/movies/${movieId}/screenings/${screeningId}/seats`
    : null;
  const checkoutPath = canGoCheckout
    ? `/booking/movies/${movieId}/screenings/${screeningId}/checkout`
    : null;
  const confirmationPath = canGoConfirmation
    ? `/booking/movies/${movieId}/screenings/${screeningId}/confirmation/${bookingId}`
    : null;

  const currentStep = isOnConfirmationPage
    ? 4
    : isOnCheckoutPage
    ? 3
    : isOnSeatPickerPage
    ? 2
    : 1;

  const stepState = (stepNumber) => {
    if (isOnConfirmationPage && stepNumber !== 4) return "locked";
    if (isOnConfirmationPage && stepNumber === currentStep) return "done";
    if (stepNumber === currentStep) {
      return "current";
    }
    if (stepNumber < currentStep) return "done";
    return "locked";
  };

  return (
    <nav className={styles.nav}>
      <ol className={styles.list}>
        <StepItem label="1. Välj film" to="/booking" state={stepState(1)} />
        <StepItem label="2. Välj platser" to={seatsPath} state={stepState(2)} />
        <StepItem label="3. Boka" to={checkoutPath} state={stepState(3)} />
        <StepItem
          label="4. Bekräftelse"
          to={confirmationPath}
          state={stepState(4)}
        />
      </ol>
    </nav>
  );
};

export default BookingStepper;
