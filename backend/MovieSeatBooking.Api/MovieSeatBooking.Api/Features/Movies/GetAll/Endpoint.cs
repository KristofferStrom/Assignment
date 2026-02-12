using MovieSeatBooking.Api.Shared.Messaging;
using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Features.Movies.GetAll;

public static class Endpoint
{
    public static IEndpointRouteBuilder MapGetAllMoviesEndpoint(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/movies").WithTags("Movies");
        group
            .MapGet(
                "/",
                async (IDispatcher dispatcher, CancellationToken ct) =>
                {
                    var query = new GetAllMoviesQuery();
                    var result = await dispatcher.SendAsync(query, ct);
                    return result.ToOk();
                }
            )
            .WithName("GetAllMovies");
        return app;
    }
}
