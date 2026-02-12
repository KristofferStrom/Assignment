using MovieSeatBooking.Api.Shared.Messaging;
using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Features.Movies.Delete;

public static class Endpoint
{
    public static IEndpointRouteBuilder MapDeleteMovieEndpoint(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/movies").WithTags("Movies");
        group
            .MapDelete(
                "/{id:guid}",
                async (Guid id, IDispatcher dispatcher, CancellationToken ct) =>
                {
                    var command = new DeleteMovieCommand(id);
                    var result = await dispatcher.SendAsync(command, ct);
                    return result.ToNoContent();
                }
            )
            .WithName("DeleteMovie");
        return app;
    }
}
