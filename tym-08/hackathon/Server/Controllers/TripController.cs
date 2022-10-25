using hackathon.Server.Db;
using hackathon.Shared.Models;
using Microsoft.AspNetCore.Mvc;
namespace hackathon.Server.Controllers;
public class TripController : ControllerBase
{
    public Dbcontext _context { get; set; }

    public TripController(Dbcontext context)
    {
        _context = context;
    }

    [HttpPost("addtrip")]
    public JsonResult AddTrip([FromBody] Trip t, string userID)
    {
        var user = _context.Users?.FirstOrDefault(user => user.UserId == userID);
        if (user == null) return new JsonResult(Helper.SomethingWentWrongMessage);

        Random x = new Random();
        var trip = new Trip()
        {
           EndPosX = t.EndPosX,
           EndPosY = t.EndPosY,
           StartPosX = t.StartPosX,
           StartPosY = t.StartPosY,
           ComeBack = t.ComeBack,
           WhenDate = t.WhenDate,
           ToTrip = t.ToTrip,
           Id = x.Next(0,1000000)
        };
        user?.Trips?.Add(trip);
        _context.SaveChanges();
        return new JsonResult(user);
    }

    [HttpPost("removetrip")]
    public JsonResult RemoveTrip([FromBody] Trip t, string userID)
    {
        var user = _context.Users?.FirstOrDefault(user => user.UserId == userID);
        if (user == null) return new JsonResult(Helper.SomethingWentWrongMessage);

        user.Trips?.Remove(t);
        return new JsonResult("OK");
    }


}
