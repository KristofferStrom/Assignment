using Microsoft.EntityFrameworkCore;
using MovieSeatBooking.Api.Infrastructure.Db;
using MovieSeatBooking.Api.Shared.Messaging;
using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Features.Movies.Update;

public sealed class UpdateMovieHandler(AppDbContext db)
    : ICommandHandler<UpdateMovieCommand, UpdateMovieResponse>
{
    private readonly AppDbContext _db = db;

    public async Task<Result<UpdateMovieResponse>> HandleAsync(
        UpdateMovieCommand cmd,
        CancellationToken ct
    )
    {
        try
        {
            var movie = await _db.Movies.FirstOrDefaultAsync(movie => movie.Id == cmd.Id, ct);
            if (movie == null)
            {
                return Result<UpdateMovieResponse>.Fail(
                    Errors.NotFound($"Filmen med id {cmd.Id} finns inte.")
                );
            }

            movie.Update(cmd.Title, cmd.Price);
            await _db.SaveChangesAsync(ct);

            var response = new UpdateMovieResponse(movie.Id, movie.Title, movie.Price);
            return Result<UpdateMovieResponse>.Success(response);
        }
        catch
        {
            return Result<UpdateMovieResponse>.Fail(Errors.Server());
        }
    }
}
