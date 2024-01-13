using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddOrgModelAndControllers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ContactSurname",
                table: "Organisations",
                newName: "OrganisationWebsite");

            migrationBuilder.RenameColumn(
                name: "ContactPhone",
                table: "Organisations",
                newName: "OrganisationPhone");

            migrationBuilder.RenameColumn(
                name: "ContactNotes",
                table: "Organisations",
                newName: "OrganisationNotes");

            migrationBuilder.RenameColumn(
                name: "ContactFirstName",
                table: "Organisations",
                newName: "OrganisationName");

            migrationBuilder.RenameColumn(
                name: "ContactEmail",
                table: "Organisations",
                newName: "OrganisationCountry");

            migrationBuilder.AddColumn<string>(
                name: "OrganisationAddress",
                table: "Organisations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OrganisationCity",
                table: "Organisations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrganisationAddress",
                table: "Organisations");

            migrationBuilder.DropColumn(
                name: "OrganisationCity",
                table: "Organisations");

            migrationBuilder.RenameColumn(
                name: "OrganisationWebsite",
                table: "Organisations",
                newName: "ContactSurname");

            migrationBuilder.RenameColumn(
                name: "OrganisationPhone",
                table: "Organisations",
                newName: "ContactPhone");

            migrationBuilder.RenameColumn(
                name: "OrganisationNotes",
                table: "Organisations",
                newName: "ContactNotes");

            migrationBuilder.RenameColumn(
                name: "OrganisationName",
                table: "Organisations",
                newName: "ContactFirstName");

            migrationBuilder.RenameColumn(
                name: "OrganisationCountry",
                table: "Organisations",
                newName: "ContactEmail");
        }
    }
}
