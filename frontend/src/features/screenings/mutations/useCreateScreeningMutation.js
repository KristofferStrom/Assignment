import { useMutation } from "@tanstack/react-query";
import { createScreening } from "../api/screeningsApi";

export const useCreateScreeningMutation = () => {
  return useMutation({
    mutationFn: async ({ movieId, screenId, startsAt, lang, sub }) =>
      createScreening({
        movieId,
        screenId,
        startsAt,
        language: lang,
        subtitles: sub,
      }),
  });
};
