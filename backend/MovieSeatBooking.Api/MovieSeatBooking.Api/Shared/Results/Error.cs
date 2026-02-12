namespace MovieSeatBooking.Api.Shared.Results;

public readonly record struct Error(string Code, string Message, int Status);
