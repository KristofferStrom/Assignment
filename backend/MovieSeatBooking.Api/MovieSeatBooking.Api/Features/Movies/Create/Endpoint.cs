using MovieSeatBooking.Api.Shared.Messaging;
using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Features.Movies.Create;

public static class Endpoint
{
    public static IEndpointRouteBuilder MapCreateMovieEndpoint(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/movies").WithTags("Movies");

        group
            .MapPost(
                "/",
                async (CreateMovieCommand cmd, IDispatcher dispatcher, CancellationToken ct) =>
                {
                    var result = await dispatcher.SendAsync(cmd, ct);
                    return result.ToCreated(x => $"/movies/{x.Id}");
                }
            )
            .WithName("CreateMovie");

        return app;
    }
}
