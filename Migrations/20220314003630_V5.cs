using Microsoft.EntityFrameworkCore.Migrations;

namespace WPST.Migrations
{
    public partial class V5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        { 
             migrationBuilder.AddColumn<int>(
                name: "TurnirID1",
                table: "Igrac",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Igrac_TurnirID1",
                table: "Igrac",
                column: "TurnirID1");

            migrationBuilder.AddForeignKey(
                name: "FK_Igrac_Turnir_TurnirID1",
                table: "Igrac",
                column: "TurnirID1",
                principalTable: "Turnir",
                principalColumn: "TurnirI_D",
                onDelete: ReferentialAction.Restrict);

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
              migrationBuilder.DropForeignKey(
                name: "FK_Igrac_Turnir_TurnirID1",
                table: "Igrac");

            migrationBuilder.DropIndex(
                name: "IX_Igrac_TurnirID1",
                table: "Igrac");

            migrationBuilder.DropColumn(
                name: "TurnirID1",
                table: "Igrac");
        }
    }
}
