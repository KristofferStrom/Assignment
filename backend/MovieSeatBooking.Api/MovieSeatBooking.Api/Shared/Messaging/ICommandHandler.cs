using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Shared.Messaging;

public interface ICommandHandler<TCommand, T>
    where TCommand : ICommand<Result<T>>
{
    Task<Result<T>> HandleAsync(TCommand cmd, CancellationToken ct);
}
