using Microsoft.EntityFrameworkCore;
using MovieSeatBooking.Api.Infrastructure.Db;
using MovieSeatBooking.Api.Shared.Results;
using MovieSeatBooking.Api.Shared.Validation;

namespace MovieSeatBooking.Api.Features.Bookings.Create;

public sealed class CreateBookingValidator(AppDbContext db) : IValidator<CreateBookingCommand>
{
    private readonly AppDbContext _db = db;

    public async ValueTask<IReadOnlyList<Error>> ValidateAsync(
        CreateBookingCommand instance,
        CancellationToken ct
    )
    {
        var errors = new List<Error>();

        var requestedSeats = Array.Empty<int>();

        if (string.IsNullOrWhiteSpace(instance.Name))
            errors.Add(Errors.Validation("Namn är obligatoriskt"));
        else if (instance.Name.Length > 100)
            errors.Add(Errors.Validation("Namn får inte vara längre än 100 tecken"));

        if (string.IsNullOrWhiteSpace(instance.PhoneNumber))
            errors.Add(Errors.Validation("Telefonnummer är obligatoriskt"));
        else if (instance.PhoneNumber.Length > 50)
            errors.Add(Errors.Validation("Telefonnummer får inte vara längre än 50 tecken"));

        if (instance.ScreeningId == Guid.Empty)
            errors.Add(Errors.Validation("ScreeningId får inte vara tomt"));

        if (instance.SeatNumbers is null || instance.SeatNumbers.Count == 0)
        {
            errors.Add(Errors.Validation("Minst en plats måste väljas"));
        }
        else
        {
            requestedSeats = instance!.SeatNumbers!.Distinct().ToArray();

            if (requestedSeats.Length != instance.SeatNumbers!.Count)
            {
                errors.Add(Errors.Validation("Dubbletter av platser är inte tillåtna"));
            }
        }

        if (errors.Count > 0)
            return errors;

        var capacity = await _db
            .Screenings.AsNoTracking()
            .Where(s => s.Id == instance.ScreeningId)
            .Select(s => (int?)s.Screen.Capacity)
            .FirstOrDefaultAsync(ct);

        if (capacity is null)
            return [Errors.NotFound("Screening hittades inte")];

        var invalidSeats = requestedSeats
            .Where(seat => seat < 1 || seat > capacity.Value)
            .OrderBy(seat => seat)
            .ToArray();

        if (invalidSeats.Length > 0)
        {
            errors.Add(
                Errors.Validation(
                    $"Ogiltiga platser: {string.Join(", ", invalidSeats)}. Tillåtna platser är 1-{capacity.Value}."
                )
            );

            return errors;
        }

        var conflictingSeats = await _db
            .BookedSeats.AsNoTracking()
            .Where(bs =>
                bs.ScreeningId == instance.ScreeningId && requestedSeats.Contains(bs.SeatNumber)
            )
            .Select(bs => bs.SeatNumber)
            .OrderBy(n => n)
            .ToListAsync(ct);

        if (conflictingSeats.Count > 0)
        {
            errors.Add(
                Errors.Conflict($"Platserna {string.Join(", ", conflictingSeats)} är redan bokade")
            );
        }

        return errors;
    }
}
