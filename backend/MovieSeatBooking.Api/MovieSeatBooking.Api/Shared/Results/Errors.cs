namespace MovieSeatBooking.Api.Shared.Results;

public static class Errors
{
    public static Error Validation(string message) => new("validation", message, 400);

    public static Error NotFound(string message) => new("not_found", message, 404);

    public static Error Conflict(string message) => new("conflict", message, 409);

    public static Error Server(string message = "An unexpected error occurred.") =>
        new("server_error", message, 500);
}
