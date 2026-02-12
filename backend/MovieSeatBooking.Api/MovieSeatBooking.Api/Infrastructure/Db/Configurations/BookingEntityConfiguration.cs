using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MovieSeatBooking.Api.Domain.Bookings;

namespace MovieSeatBooking.Api.Infrastructure.Db.Configurations;

public sealed class BookingEntityConfiguration : IEntityTypeConfiguration<BookingEntity>
{
    public void Configure(EntityTypeBuilder<BookingEntity> b)
    {
        b.ToTable("Bookings");
        b.HasKey(x => x.Id);

        b.Property(x => x.CreatedAt).IsRequired();

        b.Property(x => x.Name).IsRequired().HasMaxLength(200);
        b.Property(x => x.PhoneNumber).IsRequired().HasMaxLength(50);

        b.HasMany(x => x.Seats)
            .WithOne(x => x.Booking)
            .HasForeignKey(x => x.BookingId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
