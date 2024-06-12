using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reservation.API.Migrations
{
    /// <inheritdoc />
    public partial class EditName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CollaboratorServiceEntities_UserServices_CollaboratorProfileId",
                table: "CollaboratorServiceEntities");

            migrationBuilder.DropForeignKey(
                name: "FK_UserServices_AspNetUsers_UserId1",
                table: "UserServices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserServices",
                table: "UserServices");

            migrationBuilder.RenameTable(
                name: "UserServices",
                newName: "CollaboratorProfiles");

            migrationBuilder.RenameIndex(
                name: "IX_UserServices_UserId1",
                table: "CollaboratorProfiles",
                newName: "IX_CollaboratorProfiles_UserId1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CollaboratorProfiles",
                table: "CollaboratorProfiles",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CollaboratorProfiles_AspNetUsers_UserId1",
                table: "CollaboratorProfiles",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CollaboratorServiceEntities_CollaboratorProfiles_CollaboratorProfileId",
                table: "CollaboratorServiceEntities",
                column: "CollaboratorProfileId",
                principalTable: "CollaboratorProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CollaboratorProfiles_AspNetUsers_UserId1",
                table: "CollaboratorProfiles");

            migrationBuilder.DropForeignKey(
                name: "FK_CollaboratorServiceEntities_CollaboratorProfiles_CollaboratorProfileId",
                table: "CollaboratorServiceEntities");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CollaboratorProfiles",
                table: "CollaboratorProfiles");

            migrationBuilder.RenameTable(
                name: "CollaboratorProfiles",
                newName: "UserServices");

            migrationBuilder.RenameIndex(
                name: "IX_CollaboratorProfiles_UserId1",
                table: "UserServices",
                newName: "IX_UserServices_UserId1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserServices",
                table: "UserServices",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CollaboratorServiceEntities_UserServices_CollaboratorProfileId",
                table: "CollaboratorServiceEntities",
                column: "CollaboratorProfileId",
                principalTable: "UserServices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserServices_AspNetUsers_UserId1",
                table: "UserServices",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
