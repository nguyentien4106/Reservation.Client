using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reservation.API.Migrations
{
    /// <inheritdoc />
    public partial class EditName1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CollaboratorProfiles_AspNetUsers_UserId1",
                table: "CollaboratorProfiles");

            migrationBuilder.DropIndex(
                name: "IX_CollaboratorProfiles_UserId1",
                table: "CollaboratorProfiles");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "CollaboratorProfiles");

            migrationBuilder.RenameColumn(
                name: "UserId1",
                table: "CollaboratorProfiles",
                newName: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_CollaboratorProfiles_ApplicationUserId",
                table: "CollaboratorProfiles",
                column: "ApplicationUserId",
                unique: true,
                filter: "[ApplicationUserId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_CollaboratorProfiles_AspNetUsers_ApplicationUserId",
                table: "CollaboratorProfiles",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CollaboratorProfiles_AspNetUsers_ApplicationUserId",
                table: "CollaboratorProfiles");

            migrationBuilder.DropIndex(
                name: "IX_CollaboratorProfiles_ApplicationUserId",
                table: "CollaboratorProfiles");

            migrationBuilder.RenameColumn(
                name: "ApplicationUserId",
                table: "CollaboratorProfiles",
                newName: "UserId1");

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "CollaboratorProfiles",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_CollaboratorProfiles_UserId1",
                table: "CollaboratorProfiles",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_CollaboratorProfiles_AspNetUsers_UserId1",
                table: "CollaboratorProfiles",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
