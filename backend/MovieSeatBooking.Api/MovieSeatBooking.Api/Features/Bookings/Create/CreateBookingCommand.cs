using MovieSeatBooking.Api.Shared.Messaging;
using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Features.Bookings.Create;

public record CreateBookingCommand(
    Guid ScreeningId,
    IReadOnlyList<int> SeatNumbers,
    string Name,
    string PhoneNumber
) : ICommand<Result<CreateBookingResponse>>;
