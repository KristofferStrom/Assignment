using MovieSeatBooking.Api.Features.Movies.Contracts;

namespace MovieSeatBooking.Api.Features.Movies.GetAll;

public record GetAllMoviesResponse(IReadOnlyList<MovieDto> Movies);
