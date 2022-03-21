using Microsoft.EntityFrameworkCore.Migrations;

namespace WPST.Migrations
{
    public partial class V3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
             migrationBuilder.AlterColumn<int>(
                name: "Nagrada",
                table: "Turnir",
                type: "int",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
                migrationBuilder.AlterColumn<string>(
                name: "Nagrada",
                table: "Turnir",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldMaxLength: 50);
        } 
    }
}
