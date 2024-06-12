using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reservation.API.Migrations
{
    /// <inheritdoc />
    public partial class EditName2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_CollaboratorServiceEntities",
                table: "CollaboratorServiceEntities");

            migrationBuilder.DropIndex(
                name: "IX_CollaboratorServiceEntities_CollaboratorProfileId",
                table: "CollaboratorServiceEntities");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "CollaboratorServiceEntities");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CollaboratorServiceEntities",
                table: "CollaboratorServiceEntities",
                columns: new[] { "CollaboratorProfileId", "ServiceId" });

            migrationBuilder.CreateIndex(
                name: "IX_CollaboratorServiceEntities_ServiceId",
                table: "CollaboratorServiceEntities",
                column: "ServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_CollaboratorServiceEntities_Services_ServiceId",
                table: "CollaboratorServiceEntities",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CollaboratorServiceEntities_Services_ServiceId",
                table: "CollaboratorServiceEntities");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CollaboratorServiceEntities",
                table: "CollaboratorServiceEntities");

            migrationBuilder.DropIndex(
                name: "IX_CollaboratorServiceEntities_ServiceId",
                table: "CollaboratorServiceEntities");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "CollaboratorServiceEntities",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_CollaboratorServiceEntities",
                table: "CollaboratorServiceEntities",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_CollaboratorServiceEntities_CollaboratorProfileId",
                table: "CollaboratorServiceEntities",
                column: "CollaboratorProfileId");
        }
    }
}
