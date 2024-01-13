using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class RemoveSelfRelationshipOnConnections : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Connections_Connections_ConnectionId",
                table: "Connections");

            migrationBuilder.DropIndex(
                name: "IX_Connections_ConnectionId",
                table: "Connections");

            migrationBuilder.DropColumn(
                name: "ConnectionId",
                table: "Connections");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ConnectionId",
                table: "Connections",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Connections_ConnectionId",
                table: "Connections",
                column: "ConnectionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Connections_Connections_ConnectionId",
                table: "Connections",
                column: "ConnectionId",
                principalTable: "Connections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
