using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MovieSeatBooking.Api.Domain.Movies;

namespace MovieSeatBooking.Api.Infrastructure.Db.Configurations;

public sealed class MovieEntityConfiguration : IEntityTypeConfiguration<MovieEntity>
{
    public void Configure(EntityTypeBuilder<MovieEntity> m)
    {
        m.ToTable("Movies");

        m.HasKey(x => x.Id);

        m.Property(x => x.Title).IsRequired().HasMaxLength(200);

        m.HasIndex(x => x.Title).IsUnique();
    }
}
