using MovieSeatBooking.Api.Shared.Messaging;

namespace MovieSeatBooking.Api.Features.Screenings.GetById;

public record GetScreeningByIdQuery(Guid Id) : IQuery<GetScreeningByIdResponse>;
