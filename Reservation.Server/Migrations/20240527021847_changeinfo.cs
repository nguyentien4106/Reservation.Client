using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reservation.API.Migrations
{
    /// <inheritdoc />
    public partial class changeinfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Orders_HireRequestId",
                table: "Reviews");

            migrationBuilder.RenameColumn(
                name: "HireRequestId",
                table: "Reviews",
                newName: "OrderId");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_HireRequestId",
                table: "Reviews",
                newName: "IX_Reviews_OrderId");

            migrationBuilder.AddColumn<bool>(
                name: "Recommend",
                table: "Reviews",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Reviews",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Orders_OrderId",
                table: "Reviews",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Orders_OrderId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "Recommend",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Reviews");

            migrationBuilder.RenameColumn(
                name: "OrderId",
                table: "Reviews",
                newName: "HireRequestId");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_OrderId",
                table: "Reviews",
                newName: "IX_Reviews_HireRequestId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Orders_HireRequestId",
                table: "Reviews",
                column: "HireRequestId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
