namespace MovieSeatBooking.Api.Domain.Screens;

public sealed class ScreenEntity
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Capacity { get; set; }

    private ScreenEntity() { }

    public static ScreenEntity Create(string name, int capacity)
    {
        return new ScreenEntity
        {
            Id = Guid.NewGuid(),
            Name = name,
            Capacity = capacity,
        };
    }
}
