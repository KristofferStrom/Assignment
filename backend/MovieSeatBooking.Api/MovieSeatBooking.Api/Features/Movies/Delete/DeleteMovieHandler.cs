using Microsoft.EntityFrameworkCore;
using MovieSeatBooking.Api.Infrastructure.Db;
using MovieSeatBooking.Api.Shared.Messaging;
using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Features.Movies.Delete;

public sealed class DeleteMovieHandler(AppDbContext db) : ICommandHandler<DeleteMovieCommand, Unit>
{
    private readonly AppDbContext _db = db;

    public async Task<Result<Unit>> HandleAsync(DeleteMovieCommand cmd, CancellationToken ct)
    {
        try
        {
            var movieToDelete = await _db.Movies.FirstOrDefaultAsync(m => m.Id == cmd.Id, ct);
            if (movieToDelete is null)
            {
                return Result<Unit>.Fail(
                    Errors.NotFound($"Movie with Id '{cmd.Id}' was not found.")
                );
            }

            _db.Movies.Remove(movieToDelete);
            await _db.SaveChangesAsync(ct);

            return Result<Unit>.Success(new Unit());
        }
        catch
        {
            return Result<Unit>.Fail(Errors.Server());
        }
    }
}
