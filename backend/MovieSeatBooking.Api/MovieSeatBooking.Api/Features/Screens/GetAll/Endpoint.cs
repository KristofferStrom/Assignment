using MovieSeatBooking.Api.Shared.Messaging;
using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Features.Screens.GetAll;

public static class Endpoint
{
    public static IEndpointRouteBuilder MapGetAllScreensEndpoint(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/screens").WithTags("Screens");
        group
            .MapGet(
                "/",
                async (IDispatcher dispatcher, CancellationToken ct) =>
                {
                    var query = new GetAllScreensQuery();
                    var result = await dispatcher.SendAsync(query, ct);
                    return result.ToOk();
                }
            )
            .WithName("GetAllScreens");
        return app;
    }
}
