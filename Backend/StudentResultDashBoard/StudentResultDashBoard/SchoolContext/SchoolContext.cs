using Microsoft.EntityFrameworkCore;
using StudentResultDashBoard.Modals;


    public class SchoolContext : DbContext
    {
        public SchoolContext(DbContextOptions<SchoolContext> options) : base(options) { }

        public DbSet<Student> Students { get; set; }

        public DbSet<Mark> Marks { get; set; }
    }

