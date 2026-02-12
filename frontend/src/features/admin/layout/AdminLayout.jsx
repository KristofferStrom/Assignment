import { Link, Outlet } from "react-router-dom";
import styles from "./AdminLayout.module.css";
import Card from "../../../shared/ui/card/Card";
import { useMoviesQuery } from "../../movies/queries/useMoviesQuery";
import PrimaryButton from "../../../shared/ui/buttons/primaryButton/PrimaryButton";
import { useParams } from "react-router-dom";
import { Plus } from "../../../shared/ui/icons";

const AdminLayout = () => {
  const { data: movies = [] } = useMoviesQuery();
  const { movieId } = useParams();
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.sidePanel}>
          <div className={styles.header}>
            <h1 className={styles.headerTitle}>Admin</h1>
            <Link className={styles.newMovieLink} to="/admin/movies/new">
              <PrimaryButton className={styles.newMovieButton}>
                <Plus size={22} /> Ny film
              </PrimaryButton>
            </Link>
          </div>
          <ul className={styles.movieList}>
            {movies.map((movie) => (
              <li
                key={movie.id}
                className={movie.id === movieId ? styles.active : ""}
              >
                <Link to={`/admin/movies/${movie.id}`}>{movie.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </Card>
    </div>
  );
};

export default AdminLayout;
