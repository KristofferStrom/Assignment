using Microsoft.EntityFrameworkCore;
using MovieSeatBooking.Api.Features.Screenings.Contracts;
using MovieSeatBooking.Api.Infrastructure.Db;
using MovieSeatBooking.Api.Shared.Messaging;
using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Features.Screenings.GetByMovie;

public sealed class GetScreeningsByMovieHandler(AppDbContext db)
    : IQueryHandler<GetScreeningsByMovieQuery, GetScreeningsByMovieResponse>
{
    private readonly AppDbContext _db = db;

    public async Task<Result<GetScreeningsByMovieResponse>> HandleAsync(
        GetScreeningsByMovieQuery cmd,
        CancellationToken ct
    )
    {
        try
        {
            var screenings = await _db
                .Screenings.AsNoTracking()
                .Where(screening => screening.MovieId == cmd.MovieId)
                .OrderBy(screening => screening.StartsAt)
                .Select(screening => new ScreeningDto(
                    Id: screening.Id,
                    ScreenId: screening.ScreenId,
                    ScreenName: screening.Screen.Name,
                    StartsAt: screening.StartsAt,
                    Price: screening.Movie.Price,
                    Language: screening.Language,
                    Subtitles: screening.Subtitles,
                    AvailableSeats: screening.Screen.Capacity - screening.BookedSeats.Count()
                ))
                .ToListAsync(ct);

            return Result<GetScreeningsByMovieResponse>.Success(
                new GetScreeningsByMovieResponse(screenings)
            );
        }
        catch
        {
            return Result<GetScreeningsByMovieResponse>.Fail(Errors.Server());
        }
    }
}
