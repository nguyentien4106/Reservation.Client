using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reservation.API.Migrations
{
    /// <inheritdoc />
    public partial class editfield1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AdditionalServices",
                table: "Collaborators",
                newName: "OtherServices");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OtherServices",
                table: "Collaborators",
                newName: "AdditionalServices");
        }
    }
}
