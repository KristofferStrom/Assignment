using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MovieSeatBooking.Api.Domain.Bookings;
using MovieSeatBooking.Api.Domain.Screenings;

namespace MovieSeatBooking.Api.Infrastructure.Db.Configurations;

public sealed class BookedSeatEntityConfiguration : IEntityTypeConfiguration<BookedSeatEntity>
{
    public void Configure(EntityTypeBuilder<BookedSeatEntity> b)
    {
        b.ToTable("BookedSeats");

        b.HasKey(x => new { x.ScreeningId, x.SeatNumber });

        b.HasOne<ScreeningEntity>()
            .WithMany(s => s.BookedSeats)
            .HasForeignKey(x => x.ScreeningId)
            .OnDelete(DeleteBehavior.Cascade);

        b.Property(x => x.SeatNumber).IsRequired();
        b.Property(x => x.BookingId).IsRequired();
    }
}
