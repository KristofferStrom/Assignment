import styles from "./MoviePicker.module.css";
import { useMoviesQuery } from "../../../../movies/queries/useMoviesQuery";
import Spinner from "../../../../../shared/ui/spinner/Spinner";

const MoviePicker = ({ value, onChange }) => {
  const { data: movies = [], isLoading } = useMoviesQuery();

  return (
    <div className={styles.movieContainer}>
      <label htmlFor="movie">Filmer:</label>
      {isLoading ? (
        <Spinner size="sm" />
      ) : (
        <select
          name="movie"
          id="movie"
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={isLoading}
        >
          <option value="" disabled>
            Välj en film
          </option>

          {movies
            ? movies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.title} ({movie.price} kr)
                </option>
              ))
            : null}
        </select>
      )}
    </div>
  );
};

export default MoviePicker;
