using MovieSeatBooking.Api.Domain.Bookings;
using MovieSeatBooking.Api.Domain.Movies;
using MovieSeatBooking.Api.Domain.Screens;

namespace MovieSeatBooking.Api.Domain.Screenings;

public sealed class ScreeningEntity
{
    public Guid Id { get; set; }
    public Guid MovieId { get; set; }
    public MovieEntity Movie { get; set; } = null!;
    public Guid ScreenId { get; set; }
    public string Language { get; set; } = null!;
    public string? Subtitles { get; set; }
    public ScreenEntity Screen { get; set; } = null!;
    public DateTime StartsAt { get; set; }
    public ICollection<BookedSeatEntity> BookedSeats { get; private set; } = [];

    private ScreeningEntity() { }

    public static ScreeningEntity Create(
        Guid movieId,
        Guid screenId,
        DateTime startsAt,
        string language = "EN",
        string? subtitles = null
    )
    {
        return new ScreeningEntity
        {
            Id = Guid.NewGuid(),
            MovieId = movieId,
            ScreenId = screenId,
            StartsAt = startsAt,
            Language = language,
            Subtitles = subtitles,
        };
    }
}
