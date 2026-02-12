using MovieSeatBooking.Api.Shared.Results;
using MovieSeatBooking.Api.Shared.Validation;

namespace MovieSeatBooking.Api.Features.Screenings.Create;

public sealed class CreateScreeningValidator : IValidator<CreateScreeningCommand>
{
    public ValueTask<IReadOnlyList<Error>> ValidateAsync(
        CreateScreeningCommand instance,
        CancellationToken ct
    )
    {
        var errors = new List<Error>();
        if (instance.StartsAt <= DateTime.UtcNow)
            errors.Add(Errors.Validation("Starttiden får inte ligga bakåt i tiden."));

        if (string.IsNullOrWhiteSpace(instance.Language))
            errors.Add(Errors.Validation("Språk måste anges."));

        if (instance.ScreenId == Guid.Empty)
            errors.Add(Errors.Validation("ScreenId måste anges."));

        if (instance.MovieId == Guid.Empty)
            errors.Add(Errors.Validation("MovieId måste anges."));

        return ValueTask.FromResult<IReadOnlyList<Error>>(errors);
    }
}
