using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reservation.Server.Migrations
{
    /// <inheritdoc />
    public partial class addmoreinfo1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "JobService");

            migrationBuilder.AddColumn<int>(
                name: "PaymentType",
                table: "Jobs",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Jobs",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentType",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Jobs");

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "JobService",
                type: "decimal(18,2)",
                nullable: true);
        }
    }
}
