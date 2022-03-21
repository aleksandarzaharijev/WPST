using Microsoft.EntityFrameworkCore.Migrations;

namespace WPST.Migrations
{
    public partial class V2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Rezultat",
                table: "Mec",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
           migrationBuilder.DropColumn(
                name: "Rezultat",
                table: "Mec");
        }
    }
}
