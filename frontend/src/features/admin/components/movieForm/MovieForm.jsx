import styles from "./MovieForm.module.css";
import Highlight from "../../../../shared/ui/highlight/Highlight";
import {
  Form,
  FormGroup,
  Label,
  Input,
  ErrorMessage,
} from "../../../../shared/ui/forms";
import PrimaryButton from "../../../../shared/ui/buttons/primaryButton/PrimaryButton";
import SecondaryButton from "../../../../shared/ui/buttons/secondaryButton/SecondaryButton";
import { useState } from "react";
import { getInputError } from "../../../../shared/validation/inputValidation";

const MovieForm = ({
  movieToEdit = null,
  onSubmit,
  onRemove,
  headerTitle = "",
}) => {
  const [title, setTitle] = useState(movieToEdit?.title ?? "");
  const [titleError, setTitleError] = useState(null);

  const [price, setPrice] = useState(movieToEdit?.price ?? 0);
  const [priceError, setPriceError] = useState(null);

  const handleTitleChange = (title) => {
    const error = getInputError(title, {
      min: 1,
      max: 100,
      minError: "Titel måste innehålla minst 1 tecken",
      maxError: "Titel kan inte innehålla mer än 100 tecken",
    });
    setTitleError(error);
    setTitle(title);
  };

  const handlePriceChange = (price) => {
    const error = getInputError(price, {
      required: true,
      minNumber: 1,
      min: 1,
      minError: "Pris måste vara minst 1 kr",
      minNumberError: "Pris måste vara minst 1 kr",
    });

    setPriceError(error);
    setPrice(price);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (titleError || priceError) return;
    onSubmit({ title, price });
  };

  return (
    <>
      <h1 className={styles.headerTitle}>{headerTitle}</h1>
      <Highlight className={styles.movieFormContainer}>
        <Form className={styles.form} onSubmit={handleSubmit}>
          <FormGroup>
            <Label text="Titel" htmlFor="title" />
            <Input
              id="title"
              name="title"
              value={title}
              onChange={handleTitleChange}
            />
            {titleError && <ErrorMessage>{titleError}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label text="Pris" htmlFor="price" />
            <div className={styles.priceInputContainer}>
              <Input
                id="price"
                type="number"
                name="price"
                value={price}
                onChange={handlePriceChange}
              />
              <span className={styles.priceInfo}>kr</span>
            </div>
            {priceError && <ErrorMessage>{priceError}</ErrorMessage>}
          </FormGroup>

          <div className={styles.actionButtons}>
            <PrimaryButton
              type="submit"
              disabled={
                !title ||
                price <= 0 ||
                (movieToEdit
                  ? title === movieToEdit.title && price === movieToEdit.price
                  : false)
              }
            >
              {" "}
              {movieToEdit ? "Spara ändringar" : "Spara film"}
            </PrimaryButton>
            {movieToEdit && (
              <SecondaryButton
                disabled={!movieToEdit}
                className={styles.deleteButton}
                onClick={() => onRemove(movieToEdit.id)}
              >
                Ta bort film
              </SecondaryButton>
            )}
          </div>
        </Form>
      </Highlight>
    </>
  );
};

export default MovieForm;
