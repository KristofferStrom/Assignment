namespace MovieSeatBooking.Api.Shared.Results;

public readonly struct Result<T>
{
    public bool IsSuccess { get; }
    public T? Value { get; }
    public IReadOnlyList<Error> Errors { get; }

    private Result(bool isSuccess, T? value, IReadOnlyList<Error> errors)
    {
        IsSuccess = isSuccess;
        Value = value;
        Errors = errors;
    }

    public static Result<T> Success(T value) => new(true, value, Array.Empty<Error>());

    public static Result<T> Fail(params Error[] errors) => new(false, default, errors);

    public static Result<T> Fail(IReadOnlyList<Error> errors) => new(false, default, errors);
}
