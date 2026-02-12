using MovieSeatBooking.Api.Shared.Results;
using MovieSeatBooking.Api.Shared.Validation;

namespace MovieSeatBooking.Api.Shared.Messaging.Decorators;

public sealed class ValidationDecorator<TCommand, T>(
    ICommandHandler<TCommand, T> inner,
    IEnumerable<IValidator<TCommand>> validators
) : ICommandHandler<TCommand, T>
    where TCommand : ICommand<Result<T>>
{
    public async Task<Result<T>> HandleAsync(TCommand command, CancellationToken ct)
    {
        if (!validators.Any())
            return await inner.HandleAsync(command, ct);

        var errors = new List<Error>();

        foreach (var v in validators)
        {
            var result = await v.ValidateAsync(command, ct);
            if (result is { Count: > 0 })
                errors.AddRange(result);
        }

        return errors.Count > 0 ? Result<T>.Fail(errors) : await inner.HandleAsync(command, ct);
    }
}
