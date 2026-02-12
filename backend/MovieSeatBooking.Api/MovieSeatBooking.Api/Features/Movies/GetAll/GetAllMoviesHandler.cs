using Microsoft.EntityFrameworkCore;
using MovieSeatBooking.Api.Features.Movies.Contracts;
using MovieSeatBooking.Api.Infrastructure.Db;
using MovieSeatBooking.Api.Shared.Messaging;
using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Features.Movies.GetAll;

public sealed class GetAllMoviesHandler(AppDbContext db)
    : IQueryHandler<GetAllMoviesQuery, GetAllMoviesResponse>
{
    private readonly AppDbContext _db = db;

    public async Task<Result<GetAllMoviesResponse>> HandleAsync(
        GetAllMoviesQuery cmd,
        CancellationToken ct
    )
    {
        try
        {
            var movies = await _db
                .Movies.AsNoTracking()
                .OrderBy(m => m.Title)
                .Select(movie => new MovieDto(movie.Id, movie.Title, movie.Price))
                .ToListAsync(ct);

            var response = new GetAllMoviesResponse(movies);

            return Result<GetAllMoviesResponse>.Success(response);
        }
        catch
        {
            return Result<GetAllMoviesResponse>.Fail(Errors.Server());
        }
    }
}
