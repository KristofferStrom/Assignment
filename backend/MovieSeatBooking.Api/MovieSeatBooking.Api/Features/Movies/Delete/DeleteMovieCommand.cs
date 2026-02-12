using MovieSeatBooking.Api.Shared.Messaging;
using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Features.Movies.Delete;

public sealed record DeleteMovieCommand(Guid Id) : ICommand<Result<Unit>>;
