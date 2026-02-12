import styles from "./AdminScreeningCreatePage.module.css";
import { useSelectedMovie } from "../../../movies/hooks/useSelectedMovie";
import Dropdown from "../../../../shared/ui/dropdown/Dropdown";
import { useScreensQuery } from "../../../screens/queries/useScreensQuery";
import { useState } from "react";
import {
  ErrorMessage,
  Form,
  FormGroup,
  Input,
  Label,
} from "../../../../shared/ui/forms";
import DatePicker from "../../../../shared/ui/datePicker/DatePicker";
import PrimaryButton from "../../../../shared/ui/buttons/primaryButton/PrimaryButton";
import Highlight from "../../../../shared/ui/highlight/Highlight";
import SecondaryButton from "../../../../shared/ui/buttons/secondaryButton/SecondaryButton";
import { useCreateScreeningMutation } from "../../../screenings/mutations/useCreateScreeningMutation";
import { useNavigate } from "react-router-dom";
const AdminScreeningCreatePage = () => {
  const { selectedMovie } = useSelectedMovie();
  const { data: screens = [] } = useScreensQuery();
  const [selectedScreen, setSelectedScreen] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [lang, setLang] = useState("");
  const [sub, setSub] = useState("");
  const createScreeningMutation = useCreateScreeningMutation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      createScreeningMutation.mutate(
        {
          movieId: selectedMovie.id,
          screenId: selectedScreen,
          startsAt,
          lang,
          sub,
        },
        {
          onSuccess: () => navigate(`/admin/movies/${selectedMovie.id}`),
        }
      );
    }
  };

  const isFormValid =
    selectedScreen && startsAt && startsAt > new Date().toISOString() && lang;

  const handleCancel = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate(`/admin/movies/${selectedMovie.id}`);
  };

  return (
    <div className={styles.screeningCreatePage}>
      <h1 className={styles.title}>
        Skapa ny visning för <span>{selectedMovie?.title}</span>
      </h1>

      <Highlight>
        <Form onSubmit={handleSubmit}>
          <div className={styles.column}>
            <Dropdown
              id="screen"
              label="Välj salong"
              options={screens.map((s) => ({ value: s.id, label: s.name }))}
              value={selectedScreen}
              onChange={setSelectedScreen}
              className={styles.dropdown}
              required
            />
            <DatePicker
              id="startsAt"
              label="Starttid"
              value={startsAt}
              onChange={setStartsAt}
              type="datetime-local"
              required
              className={styles.datePicker}
            />
          </div>
          <div className={styles.column}>
            <FormGroup>
              <Label text="Språk" htmlFor="lang" required />
              <Input
                id="lang"
                name="lang"
                type="text"
                placeholder="t.ex. SV"
                required
                value={lang}
                onChange={setLang}
              />
            </FormGroup>
            <FormGroup>
              <Label text="Text" htmlFor="sub" />
              <Input
                id="sub"
                name="sub"
                type="text"
                placeholder="t.ex. SV"
                value={sub}
                onChange={setSub}
              />
            </FormGroup>
          </div>
          <div className={styles.actions}>
            <SecondaryButton
              onClick={handleCancel}
              type="button"
              className={styles.cancelBtn}
            >
              Avbryt
            </SecondaryButton>
            <PrimaryButton
              disabled={!isFormValid}
              type="submit"
              className={styles.submitBtn}
            >
              Skapa visning
            </PrimaryButton>
          </div>
        </Form>
      </Highlight>
    </div>
  );
};

export default AdminScreeningCreatePage;
