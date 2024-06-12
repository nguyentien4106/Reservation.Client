using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reservation.API.Migrations
{
    /// <inheritdoc />
    public partial class editname10 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HireRequests_AspNetUsers_ApplicationUserId",
                table: "HireRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_HireRequests_Collaborators_CollaboratorId",
                table: "HireRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_HireRequests_HireRequestId",
                table: "Reviews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HireRequests",
                table: "HireRequests");

            migrationBuilder.RenameTable(
                name: "HireRequests",
                newName: "Orders");

            migrationBuilder.RenameIndex(
                name: "IX_HireRequests_CollaboratorId",
                table: "Orders",
                newName: "IX_Orders_CollaboratorId");

            migrationBuilder.RenameIndex(
                name: "IX_HireRequests_ApplicationUserId",
                table: "Orders",
                newName: "IX_Orders_ApplicationUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Orders",
                table: "Orders",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_ApplicationUserId",
                table: "Orders",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Collaborators_CollaboratorId",
                table: "Orders",
                column: "CollaboratorId",
                principalTable: "Collaborators",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Orders_HireRequestId",
                table: "Reviews",
                column: "HireRequestId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_ApplicationUserId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Collaborators_CollaboratorId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Orders_HireRequestId",
                table: "Reviews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Orders",
                table: "Orders");

            migrationBuilder.RenameTable(
                name: "Orders",
                newName: "HireRequests");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_CollaboratorId",
                table: "HireRequests",
                newName: "IX_HireRequests_CollaboratorId");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_ApplicationUserId",
                table: "HireRequests",
                newName: "IX_HireRequests_ApplicationUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HireRequests",
                table: "HireRequests",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_HireRequests_AspNetUsers_ApplicationUserId",
                table: "HireRequests",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_HireRequests_Collaborators_CollaboratorId",
                table: "HireRequests",
                column: "CollaboratorId",
                principalTable: "Collaborators",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_HireRequests_HireRequestId",
                table: "Reviews",
                column: "HireRequestId",
                principalTable: "HireRequests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
