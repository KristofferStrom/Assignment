using Microsoft.EntityFrameworkCore;
using MovieSeatBooking.Api.Domain.Bookings;
using MovieSeatBooking.Api.Domain.Movies;
using MovieSeatBooking.Api.Domain.Screenings;
using MovieSeatBooking.Api.Domain.Screens;

namespace MovieSeatBooking.Api.Infrastructure.Db;

public static class SeedData
{
    public static async Task SeedAsync(AppDbContext db, CancellationToken ct = default)
    {
        if (!await db.Screens.AnyAsync(ct))
        {
            db.Screens.AddRange(
                ScreenEntity.Create(name: "Salong 1", capacity: 48),
                ScreenEntity.Create(name: "Salong 2", capacity: 40)
            );

            await db.SaveChangesAsync(ct);
        }

        if (!await db.Movies.AnyAsync(ct))
        {
            db.Movies.AddRange(
                MovieEntity.Create("Inception", 149),
                MovieEntity.Create("Interstellar", 159),
                MovieEntity.Create("The Dark Knight", 180),
                MovieEntity.Create("The Matrix", 170),
                MovieEntity.Create("Parasite", 150),
                // Svenska filmer
                MovieEntity.Create("Den bästa sommaren", 135),
                MovieEntity.Create("Låt den rätte komma in", 145),
                MovieEntity.Create("En man som heter Ove", 155)
            );

            await db.SaveChangesAsync(ct);
        }

        if (!await db.Screenings.AnyAsync(ct))
        {
            var screens = await db.Screens.ToListAsync(ct);
            var movies = await db.Movies.ToListAsync(ct);

            var rng = new Random(42);

            var baseDate = DateTime.UtcNow.Date.AddDays(rng.Next(30, 70));

            var timeSlots = new[]
            {
                TimeSpan.FromHours(12.5),
                TimeSpan.FromHours(14.0),
                TimeSpan.FromHours(16.0),
                TimeSpan.FromHours(18.0),
                TimeSpan.FromHours(20.0),
                TimeSpan.FromHours(22.0),
            };

            var swedishTitles = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
            {
                "Den bästa sommaren",
                "Låt den rätte komma in",
                "En man som heter Ove",
            };

            var screenings = new List<ScreeningEntity>();

            foreach (var movie in movies)
            {
                var isSwedishMovie = swedishTitles.Contains(movie.Title);

                var count = rng.Next(3, 9);

                for (var i = 0; i < count; i++)
                {
                    var dayOffset = rng.Next(0, 14);
                    var slot = timeSlots[rng.Next(timeSlots.Length)];
                    var startsAt = baseDate.AddDays(dayOffset).Add(slot);

                    var screen = screens[rng.Next(screens.Count)];

                    string language;
                    string? subtitles;

                    if (isSwedishMovie)
                    {
                        // Svenska film: alltid SV språk, ibland SV subtitles annars inga
                        language = "SV";
                        subtitles = rng.NextDouble() < 0.35 ? "SV" : null;
                    }
                    else
                    {
                        // Engelskspråkig film: alltid EN språk och alltid SV subtitles
                        language = "EN";
                        subtitles = "SV";
                    }

                    screenings.Add(
                        ScreeningEntity.Create(
                            movieId: movie.Id,
                            screenId: screen.Id,
                            startsAt: startsAt,
                            language: language,
                            subtitles: subtitles
                        )
                    );
                }
            }

            db.Screenings.AddRange(screenings);
            await db.SaveChangesAsync(ct);
        }

        if (!await db.Bookings.AnyAsync(ct) && !await db.BookedSeats.AnyAsync(ct))
        {
            var screenings = await db.Screenings.OrderBy(s => s.StartsAt).Take(6).ToListAsync(ct);

            var screens = await db.Screens.ToListAsync(ct);

            var rng = new Random(42);

            foreach (var screening in screenings)
            {
                var screen = screens.Single(s => s.Id == screening.ScreenId);
                var capacity = screen.Capacity;

                var used = new HashSet<int>();

                for (int bookingIndex = 0; bookingIndex < 2; bookingIndex++)
                {
                    var bookingResult = BookingEntity.Create(
                        screening.Id,
                        "Kristoffer Ström",
                        "0763233430"
                    );

                    var booking = bookingResult.Value!;
                    db.Bookings.Add(booking);

                    var seatsToBook = rng.Next(3, 6);

                    for (int i = 0; i < seatsToBook; i++)
                    {
                        int seatNumber;
                        do
                        {
                            seatNumber = rng.Next(1, capacity + 1);
                        } while (!used.Add(seatNumber));

                        db.BookedSeats.Add(
                            BookedSeatEntity.Create(
                                screeningId: screening.Id,
                                bookingId: booking.Id,
                                seatNumber: seatNumber
                            )
                        );
                    }
                }
            }

            await db.SaveChangesAsync(ct);
        }
    }
}
