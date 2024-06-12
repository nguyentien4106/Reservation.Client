using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reservation.API.Migrations
{
    /// <inheritdoc />
    public partial class addinfonew1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_HireRequests",
                table: "HireRequests");

            migrationBuilder.AddColumn<DateTime>(
                name: "ConfirmedDate",
                table: "HireRequests",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "HireRequests",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_HireRequests",
                table: "HireRequests",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_HireRequests_CollaboratorId",
                table: "HireRequests",
                column: "CollaboratorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_HireRequests",
                table: "HireRequests");

            migrationBuilder.DropIndex(
                name: "IX_HireRequests_CollaboratorId",
                table: "HireRequests");

            migrationBuilder.DropColumn(
                name: "ConfirmedDate",
                table: "HireRequests");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "HireRequests");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HireRequests",
                table: "HireRequests",
                columns: new[] { "CollaboratorId", "ApplicationUserId" });
        }
    }
}
