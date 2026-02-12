using MovieSeatBooking.Api.Domain.Movies;
using MovieSeatBooking.Api.Infrastructure.Db;
using MovieSeatBooking.Api.Shared.Messaging;
using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Features.Movies.Create;

public sealed class CreateMovieHandler(AppDbContext db)
    : ICommandHandler<CreateMovieCommand, CreateMovieResponse>
{
    private readonly AppDbContext _db = db;

    public async Task<Result<CreateMovieResponse>> HandleAsync(
        CreateMovieCommand cmd,
        CancellationToken ct = default
    )
    {
        try
        {
            var entity = MovieEntity.Create(cmd.Title, cmd.Price);
            _db.Movies.Add(entity);

            await _db.SaveChangesAsync(ct);

            return Result<CreateMovieResponse>.Success(new CreateMovieResponse(entity.Id));
        }
        catch (Exception)
        {
            return Result<CreateMovieResponse>.Fail(Errors.Server());
        }
    }
}
