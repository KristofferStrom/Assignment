using MovieSeatBooking.Api.Shared.Messaging;
using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Features.Screenings.GetById;

public static class Endpoint
{
    public static IEndpointRouteBuilder MapGetScreeningByIdEndpoint(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/screenings").WithTags("Screenings");
        group
            .MapGet(
                "/{id:guid}",
                async (Guid id, IDispatcher dispatcher, CancellationToken ct) =>
                {
                    var query = new GetScreeningByIdQuery(id);
                    var result = await dispatcher.SendAsync(query, ct);
                    return result.ToOk();
                }
            )
            .WithName("GetScreeningById");
        return app;
    }
}
