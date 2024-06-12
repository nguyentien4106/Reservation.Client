using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reservation.API.Migrations
{
    /// <inheritdoc />
    public partial class addinfor8 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_HireRequests",
                table: "HireRequests");

            migrationBuilder.DropIndex(
                name: "IX_HireRequests_CollaboratorId",
                table: "HireRequests");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HireRequests",
                table: "HireRequests",
                columns: new[] { "CollaboratorId", "ApplicationUserId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_HireRequests",
                table: "HireRequests");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HireRequests",
                table: "HireRequests",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_HireRequests_CollaboratorId",
                table: "HireRequests",
                column: "CollaboratorId");
        }
    }
}
