using Microsoft.EntityFrameworkCore;
using MovieSeatBooking.Api.Infrastructure.Db;
using MovieSeatBooking.Api.Shared.Results;
using MovieSeatBooking.Api.Shared.Validation;

namespace MovieSeatBooking.Api.Features.Movies.Create;

public sealed class CreateMovieValidator(AppDbContext db) : IValidator<CreateMovieCommand>
{
    private readonly AppDbContext _db = db;

    public async ValueTask<IReadOnlyList<Error>> ValidateAsync(
        CreateMovieCommand instance,
        CancellationToken ct
    )
    {
        var errors = new List<Error>();
        if (string.IsNullOrWhiteSpace(instance.Title))
        {
            errors.Add(Errors.Validation("Ange titel"));
        }
        else if (instance.Title.Length > 100)
        {
            errors.Add(Errors.Validation("Titeln får inte vara längre än 100 tecken"));
        }

        if (instance.Price < 0)
        {
            errors.Add(Errors.Validation("Priset får inte vara negativt"));
        }

        if (errors.Count == 0)
        {
            var exists = await _db.Movies.AnyAsync(
                m => m.Title.ToLower() == instance.Title.ToLower(),
                ct
            );

            if (exists)
            {
                errors.Add(Errors.Conflict("En film med samma titel finns redan"));
            }
        }

        return errors;
    }
}
