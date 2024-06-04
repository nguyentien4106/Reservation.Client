using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reservation.Server.Migrations
{
    /// <inheritdoc />
    public partial class addinfo3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Amout",
                table: "Orders",
                newName: "Amount");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Amount",
                table: "Orders",
                newName: "Amout");
        }
    }
}
