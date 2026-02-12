import { useMutation } from "@tanstack/react-query";
import { createBooking } from "../api/bookingApi";

export const useCreateBookingMutation = () => {
  return useMutation({
    mutationFn: createBooking,
  });
};
