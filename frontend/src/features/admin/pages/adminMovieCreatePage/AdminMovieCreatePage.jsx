import MovieForm from "../../components/movieForm/MovieForm";
import styles from "./AdminMovieCreatePage.module.css";
import { useCreateMovieMutation } from "../../../movies/mutations/useCreateMovieMutation";
import Spinner from "../../../../shared/ui/spinner/Spinner";
import { useNavigate } from "react-router-dom";
const AdminMovieCreatePage = () => {
  const { mutateAsync, isLoading, error } = useCreateMovieMutation();
  const navigate = useNavigate();

  const handleCreateMovie = async (movieData) => {
    console.log("triggad");

    const createdMovie = await mutateAsync(movieData);
    if (createdMovie && createdMovie.id) {
      navigate(`/admin/movies/${createdMovie.id}`);
    }
  };
  return (
    <>
      <MovieForm headerTitle="Lägg till ny film" onSubmit={handleCreateMovie} />
      {isLoading && <Spinner size="lg" />}
      {error && <p>Ett fel uppstod: {error.message}</p>}
    </>
  );
};

export default AdminMovieCreatePage;
