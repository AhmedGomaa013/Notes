using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Notes.Migrations
{
    public partial class CreatingDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Notes",
                columns: table => new
                {
                    NoteId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NoteTitle = table.Column<string>(nullable: true),
                    NoteBody = table.Column<string>(nullable: true),
                    NoteTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notes", x => x.NoteId);
                });

            migrationBuilder.InsertData(
                table: "Notes",
                columns: new[] { "NoteId", "NoteBody", "NoteTime", "NoteTitle" },
                values: new object[,]
                {
                    { 1, "It was a good movie", new DateTime(2020, 6, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), "Jojo Rabbit" },
                    { 2, "Oscar Movie", new DateTime(2020, 6, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Parasite" },
                    { 3, "Great song for anathema", new DateTime(2020, 6, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "One last goodbye" },
                    { 4, "Great song for Pink Floyd", new DateTime(2020, 6, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Hey you" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Notes");
        }
    }
}
