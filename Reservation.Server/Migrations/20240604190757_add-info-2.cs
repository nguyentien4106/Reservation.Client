﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reservation.Server.Migrations
{
    /// <inheritdoc />
    public partial class addinfo2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Offer",
                table: "Orders",
                newName: "Tips");

            migrationBuilder.AddColumn<decimal>(
                name: "Amout",
                table: "Orders",
                type: "decimal(18,2)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amout",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "Tips",
                table: "Orders",
                newName: "Offer");
        }
    }
}