using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddConnectionInteractionModelsAndRelationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "CreatedTimeUnix",
                table: "Users",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "UpdatedTimeUnix",
                table: "Users",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "CreatedTimeUnix",
                table: "Organisations",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "UpdatedTimeUnix",
                table: "Organisations",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "CreatedTimeUnix",
                table: "Contacts",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "UpdatedTimeUnix",
                table: "Contacts",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateTable(
                name: "Interactions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InteractionDate = table.Column<DateOnly>(type: "date", nullable: false),
                    InteractionTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InteractionNotes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InteractionType = table.Column<int>(type: "int", nullable: false),
                    CreatedTimeUnix = table.Column<long>(type: "bigint", nullable: false),
                    UpdatedTimeUnix = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Interactions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Connections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ConnectionLabel = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ConnectionType = table.Column<int>(type: "int", nullable: false),
                    ContactId = table.Column<int>(type: "int", nullable: false),
                    ContactModelId = table.Column<int>(type: "int", nullable: true),
                    OrganisationId = table.Column<int>(type: "int", nullable: false),
                    OrganisationModelId = table.Column<int>(type: "int", nullable: true),
                    InteractionId = table.Column<int>(type: "int", nullable: false),
                    InteractionModelId = table.Column<int>(type: "int", nullable: true),
                    ConnectionId = table.Column<int>(type: "int", nullable: false),
                    CreatedTimeUnix = table.Column<long>(type: "bigint", nullable: false),
                    UpdatedTimeUnix = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Connections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Connections_Connections_ConnectionId",
                        column: x => x.ConnectionId,
                        principalTable: "Connections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Connections_Contacts_ContactModelId",
                        column: x => x.ContactModelId,
                        principalTable: "Contacts",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Connections_Interactions_InteractionModelId",
                        column: x => x.InteractionModelId,
                        principalTable: "Interactions",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Connections_Organisations_OrganisationModelId",
                        column: x => x.OrganisationModelId,
                        principalTable: "Organisations",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Connections_ConnectionId",
                table: "Connections",
                column: "ConnectionId");

            migrationBuilder.CreateIndex(
                name: "IX_Connections_ContactModelId",
                table: "Connections",
                column: "ContactModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Connections_InteractionModelId",
                table: "Connections",
                column: "InteractionModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Connections_OrganisationModelId",
                table: "Connections",
                column: "OrganisationModelId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Connections");

            migrationBuilder.DropTable(
                name: "Interactions");

            migrationBuilder.DropColumn(
                name: "CreatedTimeUnix",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "UpdatedTimeUnix",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CreatedTimeUnix",
                table: "Organisations");

            migrationBuilder.DropColumn(
                name: "UpdatedTimeUnix",
                table: "Organisations");

            migrationBuilder.DropColumn(
                name: "CreatedTimeUnix",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "UpdatedTimeUnix",
                table: "Contacts");
        }
    }
}
