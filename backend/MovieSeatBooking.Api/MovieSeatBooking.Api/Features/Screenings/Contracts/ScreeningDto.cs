namespace MovieSeatBooking.Api.Features.Screenings.Contracts;

public sealed record ScreeningDto(
    Guid Id,
    Guid ScreenId,
    string ScreenName,
    DateTime StartsAt,
    decimal Price,
    string Language,
    string? Subtitles,
    int AvailableSeats
);
