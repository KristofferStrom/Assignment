using Microsoft.AspNetCore.Http;
using HttpResults = Microsoft.AspNetCore.Http.Results;

namespace MovieSeatBooking.Api.Shared.Results;

public static class ResultHttpExtensions
{
    public static IResult ToIResult<T>(this Result<T> result, Func<T, IResult> onSuccess)
    {
        if (result.IsSuccess)
            return onSuccess(result.Value!);

        var status =
            result.Errors.Count > 0 ? result.Errors[0].Status : StatusCodes.Status400BadRequest;

        return HttpResults.Json(new { errors = result.Errors }, statusCode: status);
    }

    public static IResult ToOk<T>(this Result<T> result) => result.ToIResult(HttpResults.Ok);

    public static IResult ToCreated<T>(this Result<T> result, Func<T, string> locationFactory) =>
        result.ToIResult(value => HttpResults.Created(locationFactory(value), value));

    public static IResult ToNoContent(this Result<Unit> result) =>
        result.ToIResult(_ => HttpResults.NoContent());
}
