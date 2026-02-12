using MovieSeatBooking.Api.Shared.Messaging;
using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Features.Movies.Create;

public sealed record CreateMovieCommand(string Title, decimal Price)
    : ICommand<Result<CreateMovieResponse>>;
