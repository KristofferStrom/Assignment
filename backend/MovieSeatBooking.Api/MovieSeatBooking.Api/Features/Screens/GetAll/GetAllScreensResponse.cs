using MovieSeatBooking.Api.Features.Screens.Contracts;

namespace MovieSeatBooking.Api.Features.Screens.GetAll;

public sealed record GetAllScreensResponse(IReadOnlyList<ScreenDto> Screens);
