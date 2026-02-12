using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Shared.Validation;

public interface IValidator<in T>
{
    ValueTask<IReadOnlyList<Error>> ValidateAsync(T instance, CancellationToken ct);
}
