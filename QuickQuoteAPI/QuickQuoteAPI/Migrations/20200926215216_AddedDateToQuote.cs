using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace QuickQuoteAPI.Migrations
{
    public partial class AddedDateToQuote : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "QuoteDate",
                table: "Quote",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QuoteDate",
                table: "Quote");
        }
    }
}
