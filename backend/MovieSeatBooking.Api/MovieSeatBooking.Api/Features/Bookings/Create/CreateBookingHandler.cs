using Microsoft.EntityFrameworkCore;
using MovieSeatBooking.Api.Domain.Bookings;
using MovieSeatBooking.Api.Infrastructure.Db;
using MovieSeatBooking.Api.Shared.Messaging;
using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Features.Bookings.Create;

public sealed class CreateBookingHandler(AppDbContext db)
    : ICommandHandler<CreateBookingCommand, CreateBookingResponse>
{
    private readonly AppDbContext _db = db;

    public async Task<Result<CreateBookingResponse>> HandleAsync(
        CreateBookingCommand cmd,
        CancellationToken ct
    )
    {
        try
        {
            var requestedSeats = cmd.SeatNumbers.OrderBy(x => x).ToList();

            var screening = await _db
                .Screenings.AsNoTracking()
                .Where(s => s.Id == cmd.ScreeningId)
                .Select(screening => new
                {
                    screening.Id,
                    MovieTitle = screening.Movie.Title,
                    ScreenName = screening.Screen.Name,
                    screening.StartsAt,
                    screening.Language,
                    screening.Subtitles,
                    PricePerSeat = screening.Movie.Price,
                })
                .FirstOrDefaultAsync(ct);
            if (screening is null)
                return Result<CreateBookingResponse>.Fail(
                    Errors.NotFound("Filmvisningen kunde inte hittas")
                );

            var bookingResult = BookingEntity.Create(cmd.ScreeningId, cmd.Name, cmd.PhoneNumber);
            if (!bookingResult.IsSuccess)
                return Result<CreateBookingResponse>.Fail(bookingResult.Errors);

            var booking = bookingResult.Value!;

            var result = booking.AddSeats(requestedSeats);
            if (!result.IsSuccess)
            {
                return Result<CreateBookingResponse>.Fail(result.Errors);
            }

            _db.Bookings.Add(booking);

            await _db.SaveChangesAsync(ct);

            var bookingFromDb = await _db
                .Bookings.AsNoTracking()
                .Where(b => b.Id == booking.Id)
                .Select(b => new
                {
                    b.Name,
                    b.PhoneNumber,
                    Seats = b.Seats.Select(s => s.SeatNumber).OrderBy(n => n).ToList(),
                })
                .FirstOrDefaultAsync(ct);

            if (bookingFromDb is null)
            {
                return Result<CreateBookingResponse>.Fail(
                    Errors.Server("Kunde inte hämta bokningsinformation efter skapande")
                );
            }

            var phone = bookingFromDb.PhoneNumber ?? string.Empty;
            var last4 = phone.Length >= 4 ? phone[^4..] : phone;
            var masked = new string('*', Math.Max(0, phone.Length - last4.Length)) + last4;

            return Result<CreateBookingResponse>.Success(
                new CreateBookingResponse(
                    BookingId: booking.Id,
                    CreatedAt: booking.CreatedAt,
                    ScreeningId: screening.Id,
                    MovieTitle: screening.MovieTitle,
                    ScreenName: screening.ScreenName,
                    StartsAt: screening.StartsAt,
                    Language: screening.Language,
                    Subtitles: screening.Subtitles,
                    PricePerSeat: screening.PricePerSeat,
                    TotalPrice: screening.PricePerSeat * bookingFromDb.Seats.Count,
                    SeatNumbers: bookingFromDb.Seats,
                    Name: bookingFromDb.Name,
                    PhoneMasked: masked
                )
            );
        }
        catch (DbUpdateException)
        {
            return Result<CreateBookingResponse>.Fail(
                Errors.Conflict("En eller flera platser är redan bokade")
            );
        }
        catch (Exception)
        {
            return Result<CreateBookingResponse>.Fail(Errors.Server());
        }
    }
}
