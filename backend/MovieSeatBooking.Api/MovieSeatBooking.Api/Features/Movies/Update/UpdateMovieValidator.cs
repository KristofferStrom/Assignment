using MovieSeatBooking.Api.Shared.Results;
using MovieSeatBooking.Api.Shared.Validation;

namespace MovieSeatBooking.Api.Features.Movies.Update;

public sealed class UpdateMovieValidator : IValidator<UpdateMovieCommand>
{
    public ValueTask<IReadOnlyList<Error>> ValidateAsync(
        UpdateMovieCommand instance,
        CancellationToken ct
    )
    {
        var errors = new List<Error>();
        if (string.IsNullOrWhiteSpace(instance.Title))
        {
            errors.Add(Errors.Validation("Ange titel"));
        }
        else if (instance.Title.Length > 100)
        {
            errors.Add(Errors.Validation("Titeln får inte vara längre än 100 tecken"));
        }

        if (instance.Price < 0)
        {
            errors.Add(Errors.Validation("Priset får inte vara negativt"));
        }

        return ValueTask.FromResult<IReadOnlyList<Error>>(errors);
    }
}
