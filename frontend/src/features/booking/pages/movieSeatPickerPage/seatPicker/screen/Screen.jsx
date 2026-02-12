import styles from "./Screen.module.css";
import { useBookingsContext } from "../../../../context/BookingsContext";
const Screen = () => {
  const { selectedScreening } = useBookingsContext();
  return (
    <div className={styles.screen}>
      <p>{selectedScreening?.screenName}</p>
    </div>
  );
};

export default Screen;
