using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hackathon.Server.Migrations
{
    public partial class another213 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trip_Users_dbUserUserId",
                table: "Trip");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Trip_dbUserUserId",
                table: "Trip");

            migrationBuilder.DropColumn(
                name: "dbUserUserId",
                table: "Trip");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "dbUserId",
                table: "Trip",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Trip_dbUserId",
                table: "Trip",
                column: "dbUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Trip_Users_dbUserId",
                table: "Trip",
                column: "dbUserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trip_Users_dbUserId",
                table: "Trip");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Trip_dbUserId",
                table: "Trip");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "dbUserId",
                table: "Trip");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Users",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "dbUserUserId",
                table: "Trip",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Trip_dbUserUserId",
                table: "Trip",
                column: "dbUserUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Trip_Users_dbUserUserId",
                table: "Trip",
                column: "dbUserUserId",
                principalTable: "Users",
                principalColumn: "UserId");
        }
    }
}
