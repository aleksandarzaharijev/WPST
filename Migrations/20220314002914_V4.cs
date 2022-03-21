using Microsoft.EntityFrameworkCore.Migrations;

namespace WPST.Migrations
{
    public partial class V4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
                migrationBuilder.DropForeignKey(
                name: "FK_Mec_Turnir_TurnirID",
                table: "Mec");

            migrationBuilder.AlterColumn<int>(
                name: "TurnirID",
                table: "Mec",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TurnirID",
                table: "Igrac",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Igrac_TurnirID",
                table: "Igrac",
                column: "TurnirID");

            migrationBuilder.AddForeignKey(
                name: "FK_Igrac_Turnir_TurnirID",
                table: "Igrac",
                column: "TurnirID",
                principalTable: "Turnir",
                principalColumn: "TurnirID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Mec_Turnir_TurnirID",
                table: "Mec",
                column: "TurnirID",
                principalTable: "Turnir",
                principalColumn: "TurnirID",
                onDelete: ReferentialAction.Cascade);

                
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {   
              
            migrationBuilder.DropForeignKey(
                name: "FK_Igrac_Turnir_TurnirID",
                table: "Igrac");

            migrationBuilder.DropForeignKey(
                name: "FK_Mec_Turnir_TurnirID",
                table: "Mec");

            migrationBuilder.DropIndex(
                name: "IX_Igrac_TurnirID",
                table: "Igrac");

            migrationBuilder.DropColumn(
                name: "TurnirID",
                table: "Igrac");

            migrationBuilder.AlterColumn<int>(
                name: "TurnirID",
                table: "Mec",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Mec_Turnir_TurnirID",
                table: "Mec",
                column: "TurnirID",
                principalTable: "Turnir",
                principalColumn: "TurnirID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
