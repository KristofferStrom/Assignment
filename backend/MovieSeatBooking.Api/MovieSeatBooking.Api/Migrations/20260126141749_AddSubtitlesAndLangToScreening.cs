using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MovieSeatBooking.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddSubtitlesAndLangToScreening : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Language",
                table: "Screenings",
                type: "TEXT",
                nullable: false,
                defaultValue: ""
            );

            migrationBuilder.AddColumn<string>(
                name: "Subtitles",
                table: "Screenings",
                type: "TEXT",
                nullable: true
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "Language", table: "Screenings");

            migrationBuilder.DropColumn(name: "Subtitles", table: "Screenings");
        }
    }
}
