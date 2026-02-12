import { clearReceipt } from "../features/booking/storage/receiptStorage";
import styles from "./RootLayout.module.css";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";

export default function RootLayout() {
  const location = useLocation();
  const { bookingId } = useParams();

  const isOnConfirmationPage =
    location.pathname.includes("/confirmation") && bookingId;

  const handleNavClick = () => {
    if (isOnConfirmationPage) {
      clearReceipt(bookingId);
    }
  };
  return (
    <div>
      <nav className={styles.header}>
        <NavLink
          to="/booking"
          onClick={handleNavClick}
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Boka
        </NavLink>
        <NavLink
          to="/admin"
          onClick={handleNavClick}
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Admin
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
