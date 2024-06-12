using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reservation.Server.Migrations
{
    /// <inheritdoc />
    public partial class editinfo111 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobService_AspNetUsers_ApplicationUserId",
                table: "JobService");

            migrationBuilder.DropForeignKey(
                name: "FK_JobService_Jobs_JobId",
                table: "JobService");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JobService",
                table: "JobService");

            migrationBuilder.DropIndex(
                name: "IX_JobService_JobId",
                table: "JobService");

            migrationBuilder.AlterColumn<Guid>(
                name: "JobId",
                table: "JobService",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ApplicationUserId",
                table: "JobService",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_JobService",
                table: "JobService",
                columns: new[] { "JobId", "ServiceId" });

            migrationBuilder.CreateIndex(
                name: "IX_JobService_ApplicationUserId",
                table: "JobService",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_JobService_AspNetUsers_ApplicationUserId",
                table: "JobService",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_JobService_Jobs_JobId",
                table: "JobService",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobService_AspNetUsers_ApplicationUserId",
                table: "JobService");

            migrationBuilder.DropForeignKey(
                name: "FK_JobService_Jobs_JobId",
                table: "JobService");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JobService",
                table: "JobService");

            migrationBuilder.DropIndex(
                name: "IX_JobService_ApplicationUserId",
                table: "JobService");

            migrationBuilder.AlterColumn<string>(
                name: "ApplicationUserId",
                table: "JobService",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "JobId",
                table: "JobService",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddPrimaryKey(
                name: "PK_JobService",
                table: "JobService",
                columns: new[] { "ApplicationUserId", "ServiceId" });

            migrationBuilder.CreateIndex(
                name: "IX_JobService_JobId",
                table: "JobService",
                column: "JobId");

            migrationBuilder.AddForeignKey(
                name: "FK_JobService_AspNetUsers_ApplicationUserId",
                table: "JobService",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JobService_Jobs_JobId",
                table: "JobService",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "Id");
        }
    }
}
