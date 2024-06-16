using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reservation.API.Migrations
{
    /// <inheritdoc />
    public partial class editinfocontract : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contracts_AspNetUsers_LesseeUserId",
                table: "Contracts");

            migrationBuilder.DropForeignKey(
                name: "FK_Contracts_AspNetUsers_LessorUserId",
                table: "Contracts");

            migrationBuilder.DropIndex(
                name: "IX_Contracts_LessorUserId",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "LesseeId",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "LessorId",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "LessorUserId",
                table: "Contracts");

            migrationBuilder.AlterColumn<string>(
                name: "LesseeUserId",
                table: "Contracts",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Contracts_AspNetUsers_LesseeUserId",
                table: "Contracts",
                column: "LesseeUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contracts_AspNetUsers_LesseeUserId",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<string>(
                name: "LesseeUserId",
                table: "Contracts",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "LesseeId",
                table: "Contracts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LessorId",
                table: "Contracts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LessorUserId",
                table: "Contracts",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_LessorUserId",
                table: "Contracts",
                column: "LessorUserId");

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
    }
}
