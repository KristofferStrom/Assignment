import styles from "./MovieDetailsScreenings.module.css";
import Spinner from "../../../../../shared/ui/spinner/Spinner";
import { Plus, Trash2 } from "../../../../../shared/ui/icons";
import SecondaryButton from "../../../../../shared/ui/buttons/secondaryButton/SecondaryButton";
import { formatSvDateTime } from "../../../../../shared/formatters/dateTime";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const MovieDetailsScreenings = ({
  screenings,
  isLoading,
  isError,
  onDelete,
}) => {
  const { movieId } = useParams();

  return (
    <div className={styles.screeningsContainer}>
      <div className={styles.screeningsHeader}>
        <h2 className={styles.screeningsTitle}>Visningar</h2>
        <Link to={`/admin/movies/${movieId}/screenings/new`}>
          <SecondaryButton>
            <Plus />
            Ny visning
          </SecondaryButton>
        </Link>
      </div>

      <div className={styles.screeningsTableWrapper}>
        <table className={styles.screeningsTable}>
          <colgroup>
            <col className={styles.colTime} />
            <col className={styles.colScreen} />
            <col className={styles.colLang} />
            <col className={styles.colSeats} />
            <col className={styles.colActions} />
          </colgroup>
          <thead>
            <tr>
              <th>Tid</th>
              <th>Salong</th>
              <th>Språk</th>
              <th>Lediga platser</th>
              <th className={styles.actionsHeader}></th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className={styles.centerCell}>
                  <Spinner size="lg" />
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={5} className={styles.centerCell}>
                  Error loading screenings
                </td>
              </tr>
            ) : screenings.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.centerCell}>
                  Inga visningar för denna film
                </td>
              </tr>
            ) : (
              screenings.map((screening) => (
                <tr key={screening.id}>
                  <td>{formatSvDateTime(screening.startsAt)}</td>
                  <td>{screening.screenName}</td>
                  <td>{screening.language}</td>
                  <td className={styles.seatsCell}>
                    {screening.availableSeats}
                  </td>
                  <td className={styles.actionsCell}>
                    <SecondaryButton
                      className={styles.deleteButton}
                      onClick={() => onDelete(screening.id)}
                    >
                      <Trash2 size={15} />
                    </SecondaryButton>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovieDetailsScreenings;
