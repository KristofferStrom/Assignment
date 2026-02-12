import MovieScreenings from "./movieScreenings/MovieScreenings";
import styles from "./MovieScreeningsPage.module.css";
import MoviePicker from "./moviePicker/MoviePicker";
import { useState } from "react";
const MovieScreeningsPage = () => {
  const [selectedMovieId, setSelectedMovieId] = useState("");

  return (
    <div className={styles.movieScreeningsPage}>
      <MoviePicker
        value={selectedMovieId ?? ""}
        onChange={setSelectedMovieId}
      />
      <MovieScreenings movieId={selectedMovieId} />
    </div>
  );
};

export default MovieScreeningsPage;
