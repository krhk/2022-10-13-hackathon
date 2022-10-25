using hackathon.Shared.Models;
using Microsoft.EntityFrameworkCore;
namespace hackathon.Server.Db;
public class Dbcontext : DbContext
{
    public Dbcontext(DbContextOptions<Dbcontext> options) : base(options) { }
    public DbSet<dbUser>? Users { get; set; }
}
