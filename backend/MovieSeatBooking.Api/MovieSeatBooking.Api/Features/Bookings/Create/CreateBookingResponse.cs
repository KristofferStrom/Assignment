namespace MovieSeatBooking.Api.Features.Bookings.Create;

public record CreateBookingResponse(
    Guid BookingId,
    DateTime CreatedAt,
    Guid ScreeningId,
    string MovieTitle,
    string ScreenName,
    DateTime StartsAt,
    string Language,
    string? Subtitles,
    decimal PricePerSeat,
    decimal TotalPrice,
    IReadOnlyList<int> SeatNumbers,
    string Name,
    string PhoneMasked
);
