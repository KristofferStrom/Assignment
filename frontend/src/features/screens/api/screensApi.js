import { api } from "../../../shared/lib/apiClient";

export const getAllScreens = async ({ signal } = {}) => {
  const data = await api.get("/screens", { signal });
  return data?.screens ?? [];
};
