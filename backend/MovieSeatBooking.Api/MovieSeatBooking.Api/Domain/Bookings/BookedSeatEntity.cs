namespace MovieSeatBooking.Api.Domain.Bookings;

public sealed class BookedSeatEntity
{
    public Guid ScreeningId { get; private set; }
    public int SeatNumber { get; private set; }

    public Guid BookingId { get; private set; }
    public BookingEntity Booking { get; private set; } = default!;

    private BookedSeatEntity() { }

    public static BookedSeatEntity Create(Guid screeningId, Guid bookingId, int seatNumber)
    {
        return new BookedSeatEntity
        {
            ScreeningId = screeningId,
            BookingId = bookingId,
            SeatNumber = seatNumber,
        };
    }
}
