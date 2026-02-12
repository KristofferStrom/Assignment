import { Outlet } from "react-router-dom";
import { BookingsProvider } from "../context/BookingsContext";
import BookingStepper from "../bookingStepper/BookingStepper";
import styles from "./BookingLayout.module.css";
import Card from "../../../shared/ui/card/Card";
export default function BookingLayout() {
  return (
    <BookingsProvider>
      <div className={styles.container}>
        <Card>
          <BookingStepper />
          <Outlet />
        </Card>
      </div>
    </BookingsProvider>
  );
}
