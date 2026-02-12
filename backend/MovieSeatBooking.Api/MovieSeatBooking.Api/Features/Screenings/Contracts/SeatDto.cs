namespace MovieSeatBooking.Api.Features.Screenings.Contracts;

public sealed record SeatDto(bool IsOccupied, int SeatNumber);
