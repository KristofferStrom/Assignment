using MovieSeatBooking.Api.Shared.Messaging;
using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Features.Movies.Update;

public static class Endpoint
{
    public static IEndpointRouteBuilder MapUpdateMovieEndpoint(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/movies").WithTags("Movies");
        group
            .MapPut(
                "/{id:guid}",
                async (
                    Guid id,
                    UpdateMovieCommand cmd,
                    IDispatcher dispatcher,
                    CancellationToken ct
                ) =>
                {
                    var command = cmd with { Id = id };
                    var result = await dispatcher.SendAsync(command, ct);
                    return result.ToOk();
                }
            )
            .WithName("UpdateMovie");
        return app;
    }
}
