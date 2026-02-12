import { useCallback, useMemo } from "react";
import { useSessionStorageState } from "../../../shared/hooks/useSessionStorageState";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";

const BookingsContext = createContext(null);

export const BookingsProvider = ({ children }) => {
  const [selectedSeatNumbersByScreening, setSelectedSeatNumbersByScreening] =
    useSessionStorageState("booking:selectedSeatNumbersByScreening", {});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);

  const clearSelectedSeats = useCallback(
    (screeningId) => {
      if (!screeningId) return;
      const key = String(screeningId);

      setSelectedSeatNumbersByScreening((prev) => {
        if (!prev?.[key]) return prev;
        const next = { ...prev };
        delete next[key];
        return next;
      });
    },
    [setSelectedSeatNumbersByScreening]
  );

  const toggleSeat = useCallback(
    (screeningId, seatNumber) => {
      if (!screeningId) return;

      setSelectedSeatNumbersByScreening((prev) => {
        const key = String(screeningId);
        const current = prev[key] ?? [];
        const next = current.includes(seatNumber)
          ? current.filter((n) => n !== seatNumber)
          : [...current, seatNumber];

        return { ...prev, [key]: next };
      });
    },
    [setSelectedSeatNumbersByScreening]
  );

  const clearOtherSelectedSeats = useCallback(
    (screeningId) => {
      if (!screeningId) return;
      const key = String(screeningId);

      setSelectedSeatNumbersByScreening((prev) => {
        const current = prev?.[key];
        return current ? { [key]: current } : {};
      });
    },
    [setSelectedSeatNumbersByScreening]
  );

  const value = useMemo(
    () => ({
      toggleSeat,
      selectedSeatNumbersByScreening,
      clearSelectedSeats,
      clearOtherSelectedSeats,
      name,
      setName,
      phone,
      setPhone,
      nameError,
      setNameError,
      phoneError,
      setPhoneError,
    }),
    [
      toggleSeat,
      selectedSeatNumbersByScreening,
      clearSelectedSeats,
      clearOtherSelectedSeats,
      name,
      phone,
      nameError,
      phoneError,
    ]
  );

  return (
    <BookingsContext.Provider value={value}>
      {children}
    </BookingsContext.Provider>
  );
};

export const useBookingsContext = () => {
  const ctx = useContext(BookingsContext);
  if (!ctx) {
    throw new Error("useBookings must be used within a BookingsProvider");
  }
  return ctx;
};
