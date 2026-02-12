namespace MovieSeatBooking.Api.Domain.Movies;

public sealed class MovieEntity
{
    public Guid Id { get; private set; }
    public string Title { get; private set; } = null!;
    public decimal Price { get; private set; }

    private MovieEntity() { }

    public void Update(string title, decimal price)
    {
        Title = title;
        Price = price;
    }

    public static MovieEntity Create(string title, decimal price)
    {
        return new MovieEntity
        {
            Id = Guid.NewGuid(),
            Title = title,
            Price = price,
        };
    }
}
