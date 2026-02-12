namespace MovieSeatBooking.Api.Shared.Messaging;

public interface IQueryHandler<TQuery, T> : ICommandHandler<TQuery, T>
    where TQuery : IQuery<T> { }
