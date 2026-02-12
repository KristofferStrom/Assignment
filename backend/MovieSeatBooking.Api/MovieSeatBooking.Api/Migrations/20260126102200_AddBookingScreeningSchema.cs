using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MovieSeatBooking.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddBookingScreeningSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Screenings_ScreenId",
                table: "Screenings",
                column: "ScreenId");

            migrationBuilder.AddForeignKey(
                name: "FK_Screenings_Screens_ScreenId",
                table: "Screenings",
                column: "ScreenId",
                principalTable: "Screens",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Screenings_Screens_ScreenId",
                table: "Screenings");

            migrationBuilder.DropIndex(
                name: "IX_Screenings_ScreenId",
                table: "Screenings");
        }
    }
}
