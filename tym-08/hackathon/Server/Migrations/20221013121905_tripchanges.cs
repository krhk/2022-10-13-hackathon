using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hackathon.Server.Migrations
{
    public partial class tripchanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Trip",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StartPosX = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartPosY = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EndPosX = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EndPosY = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WhenDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ToTrip = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ComeBack = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    dbUserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trip", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Trip_Users_dbUserId",
                        column: x => x.dbUserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Trip_dbUserId",
                table: "Trip",
                column: "dbUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Trip");
        }
    }
}
