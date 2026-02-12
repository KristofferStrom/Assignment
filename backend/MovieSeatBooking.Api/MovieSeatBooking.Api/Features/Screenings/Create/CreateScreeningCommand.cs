using MovieSeatBooking.Api.Shared.Messaging;
using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Features.Screenings.Create;

public sealed record CreateScreeningCommand(
    Guid MovieId,
    Guid ScreenId,
    string Language,
    string? Subtitles,
    DateTime StartsAt
) : ICommand<Result<CreateScreeningResponse>>;
