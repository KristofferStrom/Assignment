import { createSessionStorage } from "../../../shared/storage/createSessionStorage";

const store = createSessionStorage("booking:receipt:");

export const saveReceipt = (receipt) => {
  if (!receipt?.bookingId) return;
  store.save(receipt.bookingId, receipt);
};

export const loadReceipt = (bookingId) => store.load(bookingId);

export const clearReceipt = (bookingId) => store.clear(bookingId);
