using Microsoft.EntityFrameworkCore.Migrations;

namespace WPST.Migrations
{
    public partial class V6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Trenutno_kolo",
                table: "Turnir",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Trenutno_kolo",
                table: "Turnir");
        }
    }
}
