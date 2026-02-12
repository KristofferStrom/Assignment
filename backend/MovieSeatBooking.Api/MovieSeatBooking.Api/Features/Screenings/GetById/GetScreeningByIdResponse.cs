using MovieSeatBooking.Api.Features.Screenings.Contracts;

namespace MovieSeatBooking.Api.Features.Screenings.GetById;

public record GetScreeningByIdResponse(Guid Id, IReadOnlyList<SeatDto> Seats);
