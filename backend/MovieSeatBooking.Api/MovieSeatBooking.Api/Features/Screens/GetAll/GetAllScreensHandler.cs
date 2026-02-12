using Microsoft.EntityFrameworkCore;
using MovieSeatBooking.Api.Features.Screens.Contracts;
using MovieSeatBooking.Api.Infrastructure.Db;
using MovieSeatBooking.Api.Shared.Messaging;
using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Features.Screens.GetAll;

public sealed class GetAllScreensHandler(AppDbContext db)
    : IQueryHandler<GetAllScreensQuery, GetAllScreensResponse>
{
    private readonly AppDbContext _db = db;

    public async Task<Result<GetAllScreensResponse>> HandleAsync(
        GetAllScreensQuery cmd,
        CancellationToken ct
    )
    {
        try
        {
            var screens = await _db
                .Screens.AsNoTracking()
                .Select(s => new ScreenDto(s.Id, s.Name, s.Capacity))
                .ToListAsync(ct);

            return Result<GetAllScreensResponse>.Success(new GetAllScreensResponse(screens));
        }
        catch
        {
            return Result<GetAllScreensResponse>.Fail(Errors.Server());
        }
    }
}
