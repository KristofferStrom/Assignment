using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Shared.Messaging;

public interface IDispatcher
{
    Task<Result<T>> SendAsync<T>(ICommand<Result<T>> cmd, CancellationToken ct = default);
}
