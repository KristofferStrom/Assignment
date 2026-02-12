import styles from "./BookingCheckoutPage.module.css";
import FormGroup from "../../../../shared/ui/forms/formGroup/FormGroup";
import Label from "../../../../shared/ui/forms/label/Label";
import Input from "../../../../shared/ui/forms/input/Input";
import Form from "../../../../shared/ui/forms/form/Form";
import ErrorMessage from "../../../../shared/ui/forms/errorMessage/ErrorMessage";
import PrimaryButton from "../../../../shared/ui/buttons/primaryButton/PrimaryButton";
import Highlight from "../../../../shared/ui/highlight/Highlight";
import { Navigate } from "react-router-dom";
import { getInputError } from "../../../../shared/validation/inputValidation";
import { formatSvDateTime } from "../../../../shared/formatters/dateTime";
import { useCreateBookingMutation } from "../../mutations/useCreateBookingMutation";
import { saveReceipt } from "../../storage/receiptStorage";
import { useNavigate } from "react-router-dom";
import DefinitionRow from "../../../../shared/ui/definition/definitionRow/DefinitionRow";
import DefinitionList from "../../../../shared/ui/definition/definitionList/DefinitionList";
import Spinner from "../../../../shared/ui/spinner/Spinner";
import { useBookingsContext } from "../../context/BookingsContext";
import { useSelectedMovie } from "../../../movies/hooks/useSelectedMovie";
import { useSelectedScreening } from "../../../screenings/hooks/useSelectedScreening";

const BookingCheckoutPage = () => {
  const {
    selectedMovie,
    isError: isMovieError,
    error: moviesError,
    isLoading: moviesLoading,
  } = useSelectedMovie();
  const {
    selectedScreening,
    isError: isScreeningsError,
    error: screeningsError,
    isLoading: screeningsLoading,
  } = useSelectedScreening();
  const {
    selectedSeatNumbersByScreening,
    phone,
    setPhone,
    name,
    setName,
    nameError,
    setNameError,
    phoneError,
    setPhoneError,
  } = useBookingsContext();
  const navigate = useNavigate();

  const createBookingMutation = useCreateBookingMutation();

  const selectedNumbers =
    selectedSeatNumbersByScreening[String(selectedScreening?.id)] || [];

  if (moviesLoading || screeningsLoading) {
    return <Spinner size="lg" />;
  }

  if (isMovieError || isScreeningsError) {
    return <p>Error: {moviesError?.message || screeningsError?.message}</p>;
  }

  if (!selectedMovie || !selectedScreening) {
    return <Navigate to="/booking" replace />;
  }

  if (selectedNumbers.length === 0) {
    return (
      <Navigate
        to={`/booking/movies/${selectedMovie.id}/screenings/${selectedScreening.id}/seats`}
        replace
      />
    );
  }

  const amountOfSeats = selectedNumbers.length;
  const totalPrice = amountOfSeats * (selectedMovie?.price || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const receipt = await createBookingMutation.mutateAsync({
      screeningId: selectedScreening.id,
      seatNumbers: selectedNumbers,
      name,
      phoneNumber: phone,
    });

    saveReceipt(receipt);

    navigate(
      `/booking/movies/${selectedMovie.id}/screenings/${selectedScreening.id}/confirmation/${receipt.bookingId}`
    );
  };

  const handleNameChange = (value) => {
    const error = getInputError(value, {
      min: 1,
      minError: "Namn krävs",
      max: 50,
      maxError: "Namnet är för långt",
      lettersOnly: true,
    });

    setNameError(error);
    setName(value);
  };

  const handlePhoneChange = (value) => {
    const error = getInputError(value, {
      min: 1,
      minError: "Telefonnummer krävs",
      max: 10,
      maxError: "Telefonnummer är för långt",
      digitsOnly: true,
    });

    setPhoneError(error);
    setPhone(value);
  };

  return (
    <div className={styles.bookingCheckoutPage}>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.columns}>
          <Highlight className={styles.highlight}>
            <fieldset>
              <legend>Kontaktuppgifter</legend>
              <FormGroup className={`${styles.formGroup} ${styles.first}`}>
                <Label text="Name" htmlFor="name" required />
                <Input
                  type="text"
                  id="name"
                  required
                  onChange={handleNameChange}
                  value={name}
                />
                {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
              </FormGroup>
              <FormGroup className={styles.formGroup}>
                <Label text="Telefon" htmlFor="phone" required />
                <Input
                  type="tel"
                  id="phone"
                  required
                  onChange={handlePhoneChange}
                  value={phone}
                />
                {phoneError && <ErrorMessage>{phoneError}</ErrorMessage>}
              </FormGroup>
            </fieldset>
          </Highlight>
          <Highlight className={styles.highlight}>
            <h3 className={styles.summaryTitle}>Sammanfattning</h3>

            <DefinitionList>
              <DefinitionRow term="Film">{selectedMovie.title}</DefinitionRow>
              <DefinitionRow term="Salong">
                {selectedScreening.screenName}
              </DefinitionRow>

              <DefinitionRow term="Tid">
                {formatSvDateTime(selectedScreening.startsAt)}
              </DefinitionRow>
              <DefinitionRow term="Platser">
                {selectedNumbers.map((n) => (
                  <span key={n} className={styles.seatChip}>
                    {n}
                  </span>
                ))}
              </DefinitionRow>
              <DefinitionRow term="Antal">{amountOfSeats} st</DefinitionRow>
            </DefinitionList>

            <div className={styles.actions}>
              <div className={styles.totalRow}>
                <span>Totalt</span>
                <strong>{totalPrice} kr</strong>
              </div>
              <PrimaryButton
                disabled={!(name && phone) || nameError || phoneError}
                type="submit"
              >
                Bekräfta bokning
              </PrimaryButton>
            </div>
          </Highlight>
        </div>
      </Form>
    </div>
  );
};

export default BookingCheckoutPage;
