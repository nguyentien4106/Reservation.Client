using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reservation.API.Migrations
{
    /// <inheritdoc />
    public partial class editcontract : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contracts_AspNetUsers_ApplicationUserId",
                table: "Contracts");

            migrationBuilder.DropForeignKey(
                name: "FK_Contracts_AspNetUsers_JobApplicationUserId",
                table: "Contracts");

            migrationBuilder.RenameColumn(
                name: "JobApplicationUserId",
                table: "Contracts",
                newName: "LessorUserId");

            migrationBuilder.RenameColumn(
                name: "ApplicationUserId",
                table: "Contracts",
                newName: "LesseeUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Contracts_JobApplicationUserId",
                table: "Contracts",
                newName: "IX_Contracts_LessorUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Contracts_ApplicationUserId",
                table: "Contracts",
                newName: "IX_Contracts_LesseeUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Contracts_AspNetUsers_LesseeUserId",
                table: "Contracts",
                column: "LesseeUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Contracts_AspNetUsers_LessorUserId",
                table: "Contracts",
                column: "LessorUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contracts_AspNetUsers_LesseeUserId",
                table: "Contracts");

            migrationBuilder.DropForeignKey(
                name: "FK_Contracts_AspNetUsers_LessorUserId",
                table: "Contracts");

            migrationBuilder.RenameColumn(
                name: "LessorUserId",
                table: "Contracts",
                newName: "JobApplicationUserId");

            migrationBuilder.RenameColumn(
                name: "LesseeUserId",
                table: "Contracts",
                newName: "ApplicationUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Contracts_LessorUserId",
                table: "Contracts",
                newName: "IX_Contracts_JobApplicationUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Contracts_LesseeUserId",
                table: "Contracts",
                newName: "IX_Contracts_ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Contracts_AspNetUsers_ApplicationUserId",
                table: "Contracts",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Contracts_AspNetUsers_JobApplicationUserId",
                table: "Contracts",
                column: "JobApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
