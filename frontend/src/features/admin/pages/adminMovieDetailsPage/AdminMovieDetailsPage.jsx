import styles from "./AdminMovieDetailsPage.module.css";
import { useSelectedMovie } from "../../../movies/hooks/useSelectedMovie";
import { useScreeningsQuery } from "../../../screenings/queries/useScreeningsQuery";
import MovieForm from "../../components/movieForm/MovieForm";
import { useUpdateMovieMutation } from "../../../movies/mutations/useUpdateMovieMutation";
import { useDeleteMovieMutation } from "../../../movies/mutations/useDeleteMovieMutation";
import { useState } from "react";
import ConfirmDialog from "../../../../shared/ui/dialogs/confirmDialog/ConfirmDialog";
import { useNavigate } from "react-router-dom";
import MovieDetailsScreenings from "./movieDetailsScreenings/MovieDetailsScreenings";
import { useDeleteScreeningMutation } from "../../../screenings/mutations/useDeleteScreeningMutation";

const AdminMovieDetailsPage = () => {
  const { selectedMovie } = useSelectedMovie();
  const updateMutation = useUpdateMovieMutation();
  const deleteMovieMutation = useDeleteMovieMutation();
  const deleteScreeningMutation = useDeleteScreeningMutation();
  const [confirmMovieDeleteOpen, setConfirmMovieDeleteOpen] = useState(false);
  const [confirmScreeningDeleteOpen, setConfirmScreeningDeleteOpen] =
    useState(false);
  const [screeningIdToDelete, setScreeningIdToDelete] = useState(null);
  const navigate = useNavigate();

  const {
    data: screenings = [],
    isLoading,
    isError,
  } = useScreeningsQuery(selectedMovie?.id);

  const handleUpdateMovie = (updatedMovieData) => {
    updateMutation.mutate({ id: selectedMovie.id, ...updatedMovieData });
  };

  const openMovieDeleteDialog = () => {
    setConfirmMovieDeleteOpen(true);
  };

  const openScreeningDeleteDialog = (screeningId) => {
    setScreeningIdToDelete(screeningId);
    setConfirmScreeningDeleteOpen(true);
  };

  const handleConfirmRemoveMovie = () => {
    deleteMovieMutation.mutate(selectedMovie.id, {
      onSuccess: () => {
        setConfirmMovieDeleteOpen(false);
        navigate("/admin");
      },
      onError: () => setConfirmMovieDeleteOpen(false),
    });
  };

  const handleConfirmRemoveScreening = () => {
    deleteScreeningMutation.mutate(screeningIdToDelete, {
      onSuccess: () => {
        setConfirmScreeningDeleteOpen(false);
      },
      onError: () => setConfirmScreeningDeleteOpen(false),
    });
  };

  return (
    <div className={styles.adminMovieDetailsPage}>
      {selectedMovie && (
        <>
          <MovieForm
            key={selectedMovie.id}
            movieToEdit={selectedMovie}
            headerTitle="Redigera film"
            onSubmit={handleUpdateMovie}
            onRemove={openMovieDeleteDialog}
          />

          <ConfirmDialog
            open={confirmMovieDeleteOpen}
            title="Ta bort film?"
            message={`Är du säker på att du vill ta bort "${selectedMovie.title}"?`}
            confirmText="Ja, ta bort"
            cancelText="Nej"
            isLoading={deleteMovieMutation.isPending}
            onCancel={() => setConfirmMovieDeleteOpen(false)}
            onConfirm={handleConfirmRemoveMovie}
          />

          <ConfirmDialog
            open={confirmScreeningDeleteOpen}
            title="Ta bort visning?"
            message={`Är du säker på att du vill ta bort denna visning?`}
            confirmText="Ja, ta bort"
            cancelText="Nej"
            onCancel={() => setConfirmScreeningDeleteOpen(false)}
            onConfirm={handleConfirmRemoveScreening}
          />
          <MovieDetailsScreenings
            screenings={screenings}
            isLoading={isLoading}
            isError={isError}
            onDelete={openScreeningDeleteDialog}
          />
        </>
      )}
    </div>
  );
};

export default AdminMovieDetailsPage;
