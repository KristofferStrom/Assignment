import { api } from "../../../shared/lib/apiClient";
import { BOOKING_API_ENDPOINTS } from "./endpoints";

export const createBooking = async (
  { screeningId, seatNumbers, name, phoneNumber },
  { signal } = {}
) => {
  const data = await api.post(
    BOOKING_API_ENDPOINTS.BOOKINGS,
    {
      screeningId,
      seatNumbers,
      name,
      phoneNumber,
    },
    { signal }
  );

  return data;
};
