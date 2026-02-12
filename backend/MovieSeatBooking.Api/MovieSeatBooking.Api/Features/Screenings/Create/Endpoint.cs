using MovieSeatBooking.Api.Shared.Messaging;
using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Features.Screenings.Create;

public static class Endpoint
{
    public static IEndpointRouteBuilder MapCreateScreeningEndpoint(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/screenings").WithTags("Screenings");
        group
            .MapPost(
                "/",
                async (CreateScreeningCommand cmd, IDispatcher dispatcher, CancellationToken ct) =>
                {
                    var result = await dispatcher.SendAsync(cmd, ct);
                    return result.ToCreated(x => $"/screenings/{x.Id}");
                }
            )
            .WithName("CreateScreening");
        return app;
    }
}
