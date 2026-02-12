using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Domain.Bookings;

public sealed class BookingEntity
{
    public Guid Id { get; private set; }
    public Guid ScreeningId { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public string Name { get; private set; } = null!;
    public string PhoneNumber { get; private set; } = null!;

    public List<BookedSeatEntity> Seats { get; private set; } = [];

    private BookingEntity() { }

    private BookingEntity(Guid screeningId, string name, string phoneNumber)
    {
        Id = Guid.NewGuid();
        ScreeningId = screeningId;
        CreatedAt = DateTime.UtcNow;
        Name = name;
        PhoneNumber = phoneNumber;
    }

    public static Result<BookingEntity> Create(Guid screeningId, string name, string phoneNumber)
    {
        var errors = new List<Error>();
        if (string.IsNullOrWhiteSpace(name))
            errors.Add(Errors.Validation("Namn är obligatoriskt"));
        else if (name.Length > 100)
            errors.Add(Errors.Validation("Namn får inte vara längre än 100 tecken"));

        if (string.IsNullOrWhiteSpace(phoneNumber))
            errors.Add(Errors.Validation("Telefonnummer är obligatoriskt"));
        else if (phoneNumber.Length > 50)
            errors.Add(Errors.Validation("Telefonnummer får inte vara längre än 50 tecken"));

        if (errors.Count > 0)
            return Result<BookingEntity>.Fail(errors);

        return Result<BookingEntity>.Success(new BookingEntity(screeningId, name, phoneNumber));
    }

    public Result<Unit> AddSeats(IReadOnlyList<int> seatNumbers)
    {
        if (seatNumbers is null || seatNumbers.Count == 0)
            return Result<Unit>.Fail(Errors.Validation("Du måste välja minst en plats"));

        var distinct = seatNumbers.Distinct().ToList();
        if (distinct.Count != seatNumbers.Count)
            return Result<Unit>.Fail(Errors.Validation("Dubbletter av platser är inte tillåtna"));

        if (seatNumbers.Any(sn => sn <= 0))
            return Result<Unit>.Fail(Errors.Validation("Ogiltigt platsnummer"));

        foreach (var seatNumber in seatNumbers)
        {
            Seats.Add(BookedSeatEntity.Create(ScreeningId, Id, seatNumber));
        }

        return Result<Unit>.Success(new Unit());
    }
}
