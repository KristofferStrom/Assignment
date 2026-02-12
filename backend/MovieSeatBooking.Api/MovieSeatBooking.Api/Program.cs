using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using MovieSeatBooking.Api.Features.Bookings.Create;
using MovieSeatBooking.Api.Features.Movies.Create;
using MovieSeatBooking.Api.Features.Movies.Delete;
using MovieSeatBooking.Api.Features.Movies.GetAll;
using MovieSeatBooking.Api.Features.Movies.Update;
using MovieSeatBooking.Api.Features.Screenings.Create;
using MovieSeatBooking.Api.Features.Screenings.Delete;
using MovieSeatBooking.Api.Features.Screenings.GetById;
using MovieSeatBooking.Api.Features.Screenings.GetByMovie;
using MovieSeatBooking.Api.Features.Screens.GetAll;
using MovieSeatBooking.Api.Infrastructure.Db;
using MovieSeatBooking.Api.Shared.Messaging;
using MovieSeatBooking.Api.Shared.Messaging.Decorators;
using MovieSeatBooking.Api.Shared.Results;
using MovieSeatBooking.Api.Shared.Validation;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IDispatcher, Dispatcher>();

builder.Services.Scan(scan =>
    scan.FromAssemblyOf<Program>()
        .AddClasses(c => c.AssignableTo(typeof(ICommandHandler<,>)))
        .AsImplementedInterfaces()
        .WithScopedLifetime()
);

builder.Services.Scan(scan =>
    scan.FromAssemblyOf<Program>()
        .AddClasses(c => c.AssignableTo(typeof(IValidator<>)))
        .AsImplementedInterfaces()
        .WithScopedLifetime()
);

builder.Services.Decorate(typeof(ICommandHandler<,>), typeof(ValidationDecorator<,>));

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Default"))
);

builder.Services.AddCors();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await db.Database.MigrateAsync();
    await SeedData.SeedAsync(db);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
}

app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        var exception = context.Features.Get<IExceptionHandlerFeature>()?.Error;

        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        context.Response.ContentType = "application/json";

        await context.Response.WriteAsJsonAsync(
            new { errors = new[] { Errors.Server("Global exception") } }
        );
    });
});

app.UseHttpsRedirection();

app.MapCreateMovieEndpoint();
app.MapGetAllMoviesEndpoint();
app.MapDeleteMovieEndpoint();
app.MapUpdateMovieEndpoint();
app.MapGetScreeningsByMovieEndpoint();
app.MapGetScreeningByIdEndpoint();
app.MapCreateBookingEndpoint();
app.MapDeleteScreeningEndpoint();
app.MapCreateScreeningEndpoint();
app.MapGetAllScreensEndpoint();

app.Run();
