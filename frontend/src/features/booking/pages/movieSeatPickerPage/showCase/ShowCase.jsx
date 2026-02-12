import { Seat } from "../../../../../shared/ui";
import styles from "./ShowCase.module.css";

const ShowCase = () => {
  return (
    <ul className={styles.showcase}>
      <li>
        <Seat className={styles.seat} isShowCase />
        <small>N/A</small>
      </li>
      <li>
        <Seat className={styles.seat} isSelected isShowCase />
        <small>Selected</small>
      </li>
      <li>
        <Seat className={styles.seat} isOccupied isShowCase />
        <small>Occupied</small>
      </li>
    </ul>
  );
};

export default ShowCase;
