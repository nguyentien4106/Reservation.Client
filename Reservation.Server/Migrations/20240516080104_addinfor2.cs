using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reservation.Server.Migrations
{
    /// <inheritdoc />
    public partial class addinfor2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Job",
                table: "Collaborators",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Job",
                table: "Collaborators");
        }
    }
}
