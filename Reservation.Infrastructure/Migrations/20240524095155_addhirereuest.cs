using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reservation.API.Migrations
{
    /// <inheritdoc />
    public partial class addhirereuest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Views_CollaboratorId",
                table: "Views");

            migrationBuilder.CreateTable(
                name: "HireRequests",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CollaboratorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ApplicationUserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Offer = table.Column<int>(type: "int", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Zalo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Times = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HireRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HireRequests_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HireRequests_Collaborators_CollaboratorId",
                        column: x => x.CollaboratorId,
                        principalTable: "Collaborators",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Views_CollaboratorId",
                table: "Views",
                column: "CollaboratorId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_HireRequests_ApplicationUserId",
                table: "HireRequests",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_HireRequests_CollaboratorId",
                table: "HireRequests",
                column: "CollaboratorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HireRequests");

            migrationBuilder.DropIndex(
                name: "IX_Views_CollaboratorId",
                table: "Views");

            migrationBuilder.CreateIndex(
                name: "IX_Views_CollaboratorId",
                table: "Views",
                column: "CollaboratorId");
        }
    }
}
