using MovieSeatBooking.Api.Shared.Messaging;
using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Features.Screenings.Delete;

public static class Endpoint
{
    public static IEndpointRouteBuilder MapDeleteScreeningEndpoint(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/screenings").WithTags("Screenings");
        group
            .MapDelete(
                "/{id:guid}",
                async (Guid id, IDispatcher dispatcher, CancellationToken ct) =>
                {
                    var cmd = new DeleteScreeningCommand(id);
                    var result = await dispatcher.SendAsync(cmd, ct);
                    return result.ToNoContent();
                }
            )
            .WithName("DeleteScreening");
        return app;
    }
}
