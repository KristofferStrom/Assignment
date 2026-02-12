using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Shared.Messaging;

public interface IQuery<T> : ICommand<Result<T>> { }
