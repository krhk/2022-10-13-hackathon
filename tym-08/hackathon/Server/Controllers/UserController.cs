using hackathon.Server.Db;
using hackathon.Shared.Models;
using Microsoft.AspNetCore.Mvc;

namespace hackathon.Server.Controllers;
public class UserController : ControllerBase
{
    public Dbcontext _context { get; set; }

    public UserController(Dbcontext context)
    {
        _context = context;
    }
    /// <summary>
    /// Přihlášení uživatele
    /// </summary>
    /// <returns>ID Uživatele</returns>
    [HttpPost("/login")]
    public JsonResult Login([FromBody] LoginUserData loginUserData)
    {
        if(loginUserData.username == null || loginUserData.password == null) return new JsonResult(Helper.SomethingWentWrongMessage);
        var data = _context.Users;
        var user = _context.Users?.ToList().Where(user => user.Username == loginUserData.username).First();
        if (user == null || dbUser.ComparePass(loginUserData.password, user)) return new JsonResult(Helper.SomethingWentWrongMessage);
        return new JsonResult(user);
    }

    /// <summary>
    /// Registrace uživatele
    /// </summary>
    /// <returns>Ok/Chybovou hlášku</returns>
    [HttpPost("/register")]
    public JsonResult Register([FromBody] LoginUserData registerUserData)
    {   
        if(registerUserData.username == null || registerUserData.password == null) return new JsonResult(Helper.SomethingWentWrongMessage);
        bool userExists = (bool)_context.Users?.Any(user => user.Username == registerUserData.username);
        if (userExists) return new JsonResult(Helper.SomethingWentWrongMessage);

        var user = new dbUser()
        {
            Id = _context.Users.Count()+1,
            Username = registerUserData.username,
            Password = dbUser.HashPass(registerUserData.password),
            UserId = Guid.NewGuid().ToString(),
            Trips = new List<Trip>()
        };
        _context.Users.Add(user);
        _context.SaveChanges();
        return new JsonResult("OK");
    }
}
