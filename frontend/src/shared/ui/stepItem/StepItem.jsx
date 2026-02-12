import { Link } from "react-router-dom";
import styles from "./StepItem.module.css";

const StepItem = ({ label, to, state }) => {
  const className =
    state === "current"
      ? `${styles.step} ${styles.current}`
      : state === "done"
      ? `${styles.step} ${styles.done}`
      : `${styles.step} ${styles.locked}`;

  return (
    <li className={styles.item}>
      {to && state !== "locked" ? (
        <Link
          className={className}
          to={to}
          aria-current={state === "current" ? "step" : undefined}
        >
          {label}
        </Link>
      ) : (
        <span className={className} aria-disabled="true">
          {label}
        </span>
      )}
    </li>
  );
};

export default StepItem;
