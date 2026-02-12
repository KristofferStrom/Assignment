using MovieSeatBooking.Api.Shared.Messaging;

namespace MovieSeatBooking.Api.Features.Screenings.GetByMovie;

public sealed record GetScreeningsByMovieQuery(Guid MovieId) : IQuery<GetScreeningsByMovieResponse>;
