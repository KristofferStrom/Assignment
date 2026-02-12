using MovieSeatBooking.Api.Features.Screenings.Contracts;

namespace MovieSeatBooking.Api.Features.Screenings.GetByMovie;

public sealed record GetScreeningsByMovieResponse(IReadOnlyList<ScreeningDto> Screenings);
