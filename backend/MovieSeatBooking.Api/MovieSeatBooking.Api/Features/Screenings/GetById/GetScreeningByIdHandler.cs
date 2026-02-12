using Microsoft.EntityFrameworkCore;
using MovieSeatBooking.Api.Features.Screenings.Contracts;
using MovieSeatBooking.Api.Infrastructure.Db;
using MovieSeatBooking.Api.Shared.Messaging;
using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Features.Screenings.GetById;

public sealed class GetScreeningByIdHandler(AppDbContext db)
    : IQueryHandler<GetScreeningByIdQuery, GetScreeningByIdResponse>
{
    private readonly AppDbContext _db = db;

    public async Task<Result<GetScreeningByIdResponse>> HandleAsync(
        GetScreeningByIdQuery cmd,
        CancellationToken ct
    )
    {
        try
        {
            var data = await _db
                .Screenings.AsNoTracking()
                .Where(s => s.Id == cmd.Id)
                .Select(s => new
                {
                    s.Id,
                    s.Screen.Capacity,
                    BookedSeatNumbers = s.BookedSeats.Select(bs => bs.SeatNumber).ToList(),
                })
                .FirstOrDefaultAsync(ct);

            if (data is null)
                return Result<GetScreeningByIdResponse>.Fail(
                    Errors.NotFound("Screening not found.")
                );

            var seats = Enumerable
                .Range(1, data.Capacity)
                .Select(seatNumber => new SeatDto(
                    IsOccupied: data.BookedSeatNumbers.Contains(seatNumber),
                    SeatNumber: seatNumber
                ))
                .ToList();

            return Result<GetScreeningByIdResponse>.Success(
                new GetScreeningByIdResponse(Id: data.Id, Seats: seats)
            );
        }
        catch
        {
            return Result<GetScreeningByIdResponse>.Fail(Errors.Server());
        }
    }
}
