using MovieSeatBooking.Api.Domain.Screenings;
using MovieSeatBooking.Api.Infrastructure.Db;
using MovieSeatBooking.Api.Shared.Messaging;
using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Features.Screenings.Create;

public sealed class CreateScreeningHandler(AppDbContext db)
    : ICommandHandler<CreateScreeningCommand, CreateScreeningResponse>
{
    private readonly AppDbContext _db = db;

    public async Task<Result<CreateScreeningResponse>> HandleAsync(
        CreateScreeningCommand cmd,
        CancellationToken ct
    )
    {
        var screening = ScreeningEntity.Create(
            cmd.MovieId,
            cmd.ScreenId,
            cmd.StartsAt,
            cmd.Language,
            cmd.Subtitles
        );

        try
        {
            _db.Screenings.Add(screening);
            await _db.SaveChangesAsync(ct);

            return Result<CreateScreeningResponse>.Success(
                new CreateScreeningResponse(screening.Id)
            );
        }
        catch
        {
            return Result<CreateScreeningResponse>.Fail(Errors.Server());
        }
    }
}
