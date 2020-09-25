using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickQuoteAPI.Models
{
    public class QuickQuoteContext : DbContext
    {
        public QuickQuoteContext(DbContextOptions<QuickQuoteContext> options) : base(options)
        {
        }

        public DbSet<User> User { get; set; }
        public DbSet<Applicance> Applicance { get; set; }
        public DbSet<Quote> Quote { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<Applicance>().ToTable("Applicance");
            modelBuilder.Entity<Quote>().ToTable("Quote");
        }

    }
}
