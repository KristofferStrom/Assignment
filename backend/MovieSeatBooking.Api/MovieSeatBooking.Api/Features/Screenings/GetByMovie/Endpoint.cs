using MovieSeatBooking.Api.Shared.Messaging;
using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Features.Screenings.GetByMovie;

public static class Endpoint
{
    public static IEndpointRouteBuilder MapGetScreeningsByMovieEndpoint(
        this IEndpointRouteBuilder app
    )
    {
        var group = app.MapGroup("/screenings").WithTags("Screenings");
        group
            .MapGet(
                "/bymovie/{movieId:guid}",
                async (Guid movieId, IDispatcher dispatcher, CancellationToken ct) =>
                {
                    var query = new GetScreeningsByMovieQuery(movieId);
                    var result = await dispatcher.SendAsync(query, ct);
                    return result.ToOk();
                }
            )
            .WithName("GetScreeningsByMovie");
        return app;
    }
}
