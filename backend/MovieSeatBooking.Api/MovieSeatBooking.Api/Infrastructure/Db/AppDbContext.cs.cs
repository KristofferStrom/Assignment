using Microsoft.EntityFrameworkCore;
using MovieSeatBooking.Api.Domain.Bookings;
using MovieSeatBooking.Api.Domain.Movies;
using MovieSeatBooking.Api.Domain.Screenings;
using MovieSeatBooking.Api.Domain.Screens;

namespace MovieSeatBooking.Api.Infrastructure.Db;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<MovieEntity> Movies => Set<MovieEntity>();
    public DbSet<ScreenEntity> Screens => Set<ScreenEntity>();
    public DbSet<ScreeningEntity> Screenings => Set<ScreeningEntity>();
    public DbSet<BookingEntity> Bookings => Set<BookingEntity>();
    public DbSet<BookedSeatEntity> BookedSeats => Set<BookedSeatEntity>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}
