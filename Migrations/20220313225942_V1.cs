using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WPST.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Klubovi",
                columns: table => new
                {
                    Klub_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImeKluba = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    MestoKluba = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    BrojIgraca = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Klubovi", x => x.Klub_ID);
                });

            migrationBuilder.CreateTable(
                name: "Sudija",
                columns: table => new
                {
                    Sudija_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Klasa = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sudija", x => x.Sudija_ID);
                });

            migrationBuilder.CreateTable(
                name: "Mec",
                columns: table => new
                {
                    Mec_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Turnir_ID = table.Column<int>(type: "int", nullable: false),
                    Kolo = table.Column<int>(type: "int", nullable: false),
                    Igrac1ID = table.Column<int>(type: "int", nullable: true),
                    Igrac2ID = table.Column<int>(type: "int", nullable: true),
                    Rezultat_Ishod = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mec", x => x.Mec_ID);
                });

            migrationBuilder.CreateTable(
                name: "Turnir",
                columns: table => new
                {
                    Turnir_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime_Turnira = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    OrganizatorTurniraKlub_ID = table.Column<int>(type: "int", nullable: true),
                    Datum_pocetka = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Mesto_Odrzavanja = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    Nagrada = table.Column<int>(type: "int", maxLength: 50, nullable: false),
                    Osvajac_TurniraID = table.Column<int>(type: "int", nullable: true),
                    Sudija_ID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Turnir", x => x.Turnir_ID);
                    table.ForeignKey(
                        name: "FK_Turnir_Klubovi_OrganizatorTurniraKlub_ID",
                        column: x => x.OrganizatorTurniraKlub_ID,
                        principalTable: "Klubovi",
                        principalColumn: "Klub_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Turnir_Sudija_Sudija_ID",
                        column: x => x.Sudija_ID,
                        principalTable: "Sudija",
                        principalColumn: "Sudija_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Igrac",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Broj_Legitimacije = table.Column<int>(type: "int", maxLength: 5, nullable: false),
                    Ime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Datumrodjenja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Bodovi = table.Column<int>(type: "int", nullable: false),
                    Klub_ID = table.Column<int>(type: "int", nullable: false),
                    Turnir_ID = table.Column<int>(type: "int", nullable: true),
                    Turnir_ID1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Igrac", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Igrac_Klubovi_Klub_ID",
                        column: x => x.Klub_ID,
                        principalTable: "Klubovi",
                        principalColumn: "Klub_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Igrac_Turnir_Turnir_ID",
                        column: x => x.Turnir_ID,
                        principalTable: "Turnir",
                        principalColumn: "Turnir_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Igrac_Turnir_Turnir_ID1",
                        column: x => x.Turnir_ID1,
                        principalTable: "Turnir",
                        principalColumn: "Turnir_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Igrac_Klub_ID",
                table: "Igrac",
                column: "Klub_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Igrac_Turnir_ID",
                table: "Igrac",
                column: "Turnir_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Igrac_Turnir_ID1",
                table: "Igrac",
                column: "Turnir_ID1");

            migrationBuilder.CreateIndex(
                name: "IX_Mec_Igrac1ID",
                table: "Mec",
                column: "Igrac1ID");

            migrationBuilder.CreateIndex(
                name: "IX_Mec_Igrac2ID",
                table: "Mec",
                column: "Igrac2ID");

            migrationBuilder.CreateIndex(
                name: "IX_Mec_Turnir_ID",
                table: "Mec",
                column: "Turnir_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Turnir_OrganizatorTurniraKlub_ID",
                table: "Turnir",
                column: "OrganizatorTurniraKlub_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Turnir_Osvajac_TurniraID",
                table: "Turnir",
                column: "Osvajac_TurniraID");

            migrationBuilder.CreateIndex(
                name: "IX_Turnir_Sudija_ID",
                table: "Turnir",
                column: "Sudija_ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Mec_Igrac_Igrac1ID",
                table: "Mec",
                column: "Igrac1ID",
                principalTable: "Igrac",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Mec_Igrac_Igrac2ID",
                table: "Mec",
                column: "Igrac2ID",
                principalTable: "Igrac",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Mec_Turnir_Turnir_ID",
                table: "Mec",
                column: "Turnir_ID",
                principalTable: "Turnir",
                principalColumn: "Turnir_ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Turnir_Igrac_Osvajac_TurniraID",
                table: "Turnir",
                column: "Osvajac_TurniraID",
                principalTable: "Igrac",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Igrac_Klubovi_Klub_ID",
                table: "Igrac");

            migrationBuilder.DropForeignKey(
                name: "FK_Turnir_Klubovi_OrganizatorTurniraKlub_ID",
                table: "Turnir");

            migrationBuilder.DropForeignKey(
                name: "FK_Igrac_Turnir_Turnir_ID",
                table: "Igrac");

            migrationBuilder.DropForeignKey(
                name: "FK_Igrac_Turnir_Turnir_ID1",
                table: "Igrac");

            migrationBuilder.DropTable(
                name: "Mec");

            migrationBuilder.DropTable(
                name: "Klubovi");

            migrationBuilder.DropTable(
                name: "Turnir");

            migrationBuilder.DropTable(
                name: "Igrac");

            migrationBuilder.DropTable(
                name: "Sudija");
        }
    }
}
