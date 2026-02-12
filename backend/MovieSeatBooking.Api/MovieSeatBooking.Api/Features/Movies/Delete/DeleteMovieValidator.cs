using MovieSeatBooking.Api.Shared.Results;
using MovieSeatBooking.Api.Shared.Validation;

namespace MovieSeatBooking.Api.Features.Movies.Delete;

public sealed class DeleteMovieValidator : IValidator<DeleteMovieCommand>
{
    public ValueTask<IReadOnlyList<Error>> ValidateAsync(
        DeleteMovieCommand instance,
        CancellationToken ct
    )
    {
        if (instance.Id == Guid.Empty)
            return ValueTask.FromResult<IReadOnlyList<Error>>([
                Errors.Validation("Id is required."),
            ]);

        return ValueTask.FromResult<IReadOnlyList<Error>>([]);
    }
}
