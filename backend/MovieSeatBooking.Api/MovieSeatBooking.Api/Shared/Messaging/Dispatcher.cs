using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Shared.Messaging;

public sealed class Dispatcher(IServiceProvider sp) : IDispatcher
{
    public Task<Result<T>> SendAsync<T>(ICommand<Result<T>> cmd, CancellationToken ct = default)
    {
        var handlerType = typeof(ICommandHandler<,>).MakeGenericType(cmd.GetType(), typeof(T));
        dynamic handler = sp.GetRequiredService(handlerType);

        return (Task<Result<T>>)handler.HandleAsync((dynamic)cmd, ct);
    }
}
