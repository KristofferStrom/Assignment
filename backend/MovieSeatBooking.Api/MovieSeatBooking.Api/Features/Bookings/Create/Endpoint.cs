using MovieSeatBooking.Api.Shared.Messaging;
using MovieSeatBooking.Api.Shared.Results;

namespace MovieSeatBooking.Api.Features.Bookings.Create;

public static class Endpoint
{
    public static IEndpointRouteBuilder MapCreateBookingEndpoint(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/bookings").WithTags("Bookings");
        group
            .MapPost(
                "/",
                async (CreateBookingCommand cmd, IDispatcher dispatcher, CancellationToken ct) =>
                {
                    var result = await dispatcher.SendAsync(cmd, ct);
                    return result.ToCreated(x => $"/bookings/{x.BookingId}");
                }
            )
            .WithName("CreateBooking");
        return app;
    }
}
