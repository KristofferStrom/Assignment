using MovieSeatBooking.Api.Infrastructure.Db;
using MovieSeatBooking.Api.Shared.Messaging;
using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Features.Screenings.Delete;

public sealed class DeleteScreeningHandler(AppDbContext db)
    : ICommandHandler<DeleteScreeningCommand, Unit>
{
    private readonly AppDbContext _db = db;

    public async Task<Result<Unit>> HandleAsync(DeleteScreeningCommand cmd, CancellationToken ct)
    {
        try
        {
            var screening = await _db.Screenings.FindAsync([cmd.Id], ct);
            if (screening is null)
            {
                return Result<Unit>.Fail(Errors.NotFound($"Visning med id {cmd.Id} hittades inte"));
            }

            _db.Screenings.Remove(screening);
            await _db.SaveChangesAsync(ct);

            return Result<Unit>.Success(new Unit());
        }
        catch
        {
            return Result<Unit>.Fail(Errors.Server());
        }
    }
}
