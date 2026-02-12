using MovieSeatBooking.Api.Shared.Messaging;
using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Features.Screenings.Delete;

public sealed record DeleteScreeningCommand(Guid Id) : ICommand<Result<Unit>>;
