using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedConnectionModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Connections_Contacts_ContactModelId",
                table: "Connections");

            migrationBuilder.DropForeignKey(
                name: "FK_Connections_Interactions_InteractionModelId",
                table: "Connections");

            migrationBuilder.DropForeignKey(
                name: "FK_Connections_Organisations_OrganisationModelId",
                table: "Connections");

            migrationBuilder.DropIndex(
                name: "IX_Connections_ContactModelId",
                table: "Connections");

            migrationBuilder.DropIndex(
                name: "IX_Connections_InteractionModelId",
                table: "Connections");

            migrationBuilder.DropIndex(
                name: "IX_Connections_OrganisationModelId",
                table: "Connections");

            migrationBuilder.DropColumn(
                name: "ContactModelId",
                table: "Connections");

            migrationBuilder.DropColumn(
                name: "InteractionModelId",
                table: "Connections");

            migrationBuilder.DropColumn(
                name: "OrganisationModelId",
                table: "Connections");

            migrationBuilder.CreateIndex(
                name: "IX_Connections_ContactId",
                table: "Connections",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_Connections_InteractionId",
                table: "Connections",
                column: "InteractionId");

            migrationBuilder.CreateIndex(
                name: "IX_Connections_OrganisationId",
                table: "Connections",
                column: "OrganisationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Connections_Contacts_ContactId",
                table: "Connections",
                column: "ContactId",
                principalTable: "Contacts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Connections_Interactions_InteractionId",
                table: "Connections",
                column: "InteractionId",
                principalTable: "Interactions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Connections_Organisations_OrganisationId",
                table: "Connections",
                column: "OrganisationId",
                principalTable: "Organisations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Connections_Contacts_ContactId",
                table: "Connections");

            migrationBuilder.DropForeignKey(
                name: "FK_Connections_Interactions_InteractionId",
                table: "Connections");

            migrationBuilder.DropForeignKey(
                name: "FK_Connections_Organisations_OrganisationId",
                table: "Connections");

            migrationBuilder.DropIndex(
                name: "IX_Connections_ContactId",
                table: "Connections");

            migrationBuilder.DropIndex(
                name: "IX_Connections_InteractionId",
                table: "Connections");

            migrationBuilder.DropIndex(
                name: "IX_Connections_OrganisationId",
                table: "Connections");

            migrationBuilder.AddColumn<int>(
                name: "ContactModelId",
                table: "Connections",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InteractionModelId",
                table: "Connections",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OrganisationModelId",
                table: "Connections",
                type: "int",
                nullable: true);

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

            migrationBuilder.AddForeignKey(
                name: "FK_Connections_Contacts_ContactModelId",
                table: "Connections",
                column: "ContactModelId",
                principalTable: "Contacts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Connections_Interactions_InteractionModelId",
                table: "Connections",
                column: "InteractionModelId",
                principalTable: "Interactions",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Connections_Organisations_OrganisationModelId",
                table: "Connections",
                column: "OrganisationModelId",
                principalTable: "Organisations",
                principalColumn: "Id");
        }
    }
}
