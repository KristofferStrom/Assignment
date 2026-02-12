import styles from "./ScreeningListItem.module.css";
import SecondaryButton from "../../../../../../shared/ui/buttons/secondaryButton/SecondaryButton";

function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("sv-SE", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
}

function seatsLabel(availableSeats) {
  if (availableSeats <= 0) return "Fullt";
  if (availableSeats <= 10) return `Få kvar (${availableSeats})`;
  return `${availableSeats} platser kvar`;
}

const ScreeningListItem = ({ screening, onSelect }) => {
  const isSoldOut = screening.availableSeats <= 0;

  const handleSelectScreening = () => {
    if (isSoldOut) return;

    onSelect(screening.id);
  };

  return (
    <li className={styles.movieScreening} aria-disabled={isSoldOut}>
      <div className={styles.main}>
        <div className={styles.timeBlock}>
          <time className={styles.time} dateTime={screening.startsAt}>
            {formatTime(screening.startsAt)}
          </time>
          <span className={styles.date}>{formatDate(screening.startsAt)}</span>
        </div>

        <div className={styles.meta}>
          <span className={styles.auditorium}>{screening.screenName}</span>
          <span className={styles.language}>
            {screening.language}
            {screening.subtitles ? ` • ${screening.subtitles} text` : ""}
          </span>
        </div>
      </div>

      <div className={styles.right}>
        <span className={styles.price}>{screening.price} kr</span>
        <span
          className={`${styles.availableSeats} ${
            isSoldOut ? styles.soldOut : ""
          }`}
        >
          {seatsLabel(screening.availableSeats)}
        </span>

        {isSoldOut ? (
          <span className={styles.chooseDisabled}>Ej valbar</span>
        ) : (
          <SecondaryButton onClick={handleSelectScreening}>
            Välj
          </SecondaryButton>
        )}
      </div>
    </li>
  );
};

export default ScreeningListItem;
