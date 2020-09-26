using Microsoft.EntityFrameworkCore.Migrations;

namespace QuickQuoteAPI.Migrations
{
    public partial class InitialModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    UserID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(nullable: true),
                    UserSurname = table.Column<string>(nullable: true),
                    UserEmail = table.Column<string>(nullable: true),
                    UserPassword = table.Column<string>(nullable: true),
                    UserCellNo = table.Column<string>(nullable: true),
                    UserSuburb = table.Column<string>(nullable: true),
                    UserRiskFactor = table.Column<int>(nullable: false),
                    UserMonthlyPremium = table.Column<decimal>(type: "money", nullable: false),
                    IsEmailConfirmed = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.UserID);
                });

            migrationBuilder.CreateTable(
                name: "Quote",
                columns: table => new
                {
                    QuoteID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quote", x => x.QuoteID);
                    table.ForeignKey(
                        name: "FK_Quote_User_UserID",
                        column: x => x.UserID,
                        principalTable: "User",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Applicance",
                columns: table => new
                {
                    ApplicanceID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ApplicanceName = table.Column<string>(nullable: true),
                    ApplianceDescription = table.Column<string>(nullable: true),
                    ApplianceYear = table.Column<int>(nullable: false),
                    AppliancePrice = table.Column<decimal>(type: "money", nullable: false),
                    QuoteID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Applicance", x => x.ApplicanceID);
                    table.ForeignKey(
                        name: "FK_Applicance_Quote_QuoteID",
                        column: x => x.QuoteID,
                        principalTable: "Quote",
                        principalColumn: "QuoteID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Applicance_QuoteID",
                table: "Applicance",
                column: "QuoteID");

            migrationBuilder.CreateIndex(
                name: "IX_Quote_UserID",
                table: "Quote",
                column: "UserID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Applicance");

            migrationBuilder.DropTable(
                name: "Quote");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
