import { Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import MovieScreeningsPage from "../features/booking/pages/movieScreeningsPage/MovieScreeningsPage";
import BookingLayout from "../features/booking/layouts/BookingLayout";
import MovieSeatPickerPage from "../features/booking/pages/movieSeatPickerPage/MovieSeatPickerPage";
import BookingConfirmationPage from "../features/booking/pages/bookingConfirmationPage/BookingConfirmationPage";
import BookingCheckoutPage from "../features/booking/pages/bookingCheckoutPage/BookingCheckoutPage";
import AdminLayout from "../features/admin/layout/AdminLayout";
import AdminMovieDetailsPage from "../features/admin/pages/adminMovieDetailsPage/AdminMovieDetailsPage";
import AdminMovieCreatePage from "../features/admin/pages/adminMovieCreatePage/AdminMovieCreatePage";
import AdminScreeningCreatePage from "../features/admin/pages/adminScreeningCreatePage/AdminScreeningCreatePage";
import { HashRouter } from "react-router-dom";

export default function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Navigate to="booking" replace />} />
          <Route path="booking" element={<BookingLayout />}>
            <Route index element={<MovieScreeningsPage />} />
            <Route
              path="movies/:movieId/screenings/:screeningId/seats"
              element={<MovieSeatPickerPage />}
            />
            <Route
              path="movies/:movieId/screenings/:screeningId/checkout"
              element={<BookingCheckoutPage />}
            />
            <Route
              path="movies/:movieId/screenings/:screeningId/confirmation/:bookingId"
              element={<BookingConfirmationPage />}
            />
          </Route>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="movies/:movieId" element={<AdminMovieDetailsPage />} />
            <Route path="movies/new" element={<AdminMovieCreatePage />} />
            <Route
              path="movies/:movieId/screenings/new"
              element={<AdminScreeningCreatePage />}
            />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}
