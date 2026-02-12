using MovieSeatBooking.Api.Shared.Messaging;

namespace MovieSeatBooking.Api.Features.Movies.GetAll;

public sealed record GetAllMoviesQuery() : IQuery<GetAllMoviesResponse>;
