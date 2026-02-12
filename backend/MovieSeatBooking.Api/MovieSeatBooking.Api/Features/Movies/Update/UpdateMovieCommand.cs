using MovieSeatBooking.Api.Shared.Messaging;
using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Features.Movies.Update;

public record UpdateMovieCommand(Guid Id, string Title, decimal Price)
    : ICommand<Result<UpdateMovieResponse>>;
